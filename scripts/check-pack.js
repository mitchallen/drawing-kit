#!/usr/bin/env node
'use strict';

// Guard against a published tarball leaking files it shouldn't, or missing
// one it needs.
//
// Runs `npm pack --dry-run --json --workspaces` and, for every workspace
// package, fails if:
//   - package.json has no "files" allowlist, or the package has a .npmignore
//     (a blocklist silently ships whatever it forgets to list);
//   - a packed file is outside the "files" allowlist and npm's always-included
//     metadata (package.json, README, LICENSE);
//   - a packed file is test or generated output (test/, __tests__/,
//     coverage/, output/);
//   - the "main" entry point is missing;
//   - a packed file require()s a relative path that isn't in the tarball.
// Exits non-zero (failing CI / `make pack-check`) on any problem.

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

// npm always force-includes these regardless of the "files" allowlist.
const ALWAYS_ALLOWED = /^(package\.json|README(\.[^/]+)?|LICEN[SC]E(\.[^/]+)?)$/i;

const FORBIDDEN = /(^|\/)(test|__tests__|coverage|output)\//;

const RELATIVE_REQUIRE = /require\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g;

function workspaceDirs() {
  const dirs = {};
  for (const name of fs.readdirSync(path.join(ROOT, 'packages'))) {
    const dir = path.join(ROOT, 'packages', name);
    const manifest = path.join(dir, 'package.json');
    if (fs.existsSync(manifest)) {
      dirs[require(manifest).name] = dir;
    }
  }
  return dirs;
}

function getPackReports() {
  const out = execSync('npm pack --dry-run --json --workspaces', {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  return JSON.parse(out);
}

// The packed path a relative require() from `from` resolves to, following
// Node's file, .js and index.js lookup, or null if none of them is packed.
function resolvePacked(from, request, packed) {
  const base = path.posix.join(path.posix.dirname(from), request);
  const candidates = [base, `${base}.js`, `${base}.json`, `${base}/index.js`];
  return candidates.find((c) => packed.has(c)) || null;
}

function checkPackage(report, dir) {
  const problems = [];
  const pkg = require(path.join(dir, 'package.json'));
  const files = report.files.map((f) => f.path);
  const packed = new Set(files);

  if (!Array.isArray(pkg.files) || pkg.files.length === 0) {
    problems.push('package.json has no "files" allowlist');
  }
  if (fs.existsSync(path.join(dir, '.npmignore'))) {
    problems.push('has a .npmignore; use the "files" allowlist instead');
  }

  const allowed = (pkg.files || []).map((entry) => entry.replace(/\/+$/, ''));
  for (const file of files) {
    if (ALWAYS_ALLOWED.test(file)) continue;
    if (FORBIDDEN.test(file)) {
      problems.push(`ships test or generated output: ${file}`);
    } else if (!allowed.some((a) => file === a || file.startsWith(`${a}/`))) {
      problems.push(`ships a file outside the "files" allowlist: ${file}`);
    }
  }

  const main = path.posix.normalize(pkg.main || 'index.js');
  if (!packed.has(main)) {
    problems.push(`"main" entry point is not in the tarball: ${main}`);
  }

  for (const file of files.filter((f) => f.endsWith('.js'))) {
    const source = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const [, request] of source.matchAll(RELATIVE_REQUIRE)) {
      if (!resolvePacked(file, request, packed)) {
        problems.push(`${file} requires ${request}, which is not in the tarball`);
      }
    }
  }

  return problems;
}

function main() {
  const dirs = workspaceDirs();
  let failed = false;

  for (const report of getPackReports()) {
    const dir = dirs[report.name];
    const problems = dir
      ? checkPackage(report, dir)
      : [`no workspace directory found for ${report.name}`];
    const files = report.files.map((f) => f.path).sort();

    if (problems.length === 0) {
      console.log(`✓ ${report.name}@${report.version} (${files.length} files): ${files.join(', ')}`);
    } else {
      failed = true;
      console.error(`✗ ${report.name}@${report.version} (${files.length} files): ${files.join(', ')}`);
      for (const problem of problems) console.error(`    ${problem}`);
    }
  }

  if (failed) {
    console.error('\nFix the "files" allowlist (or the code) in the packages above.');
    process.exit(1);
  }
}

main();
