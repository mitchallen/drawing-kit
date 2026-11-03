# Makefile for drawing-kit monorepo managed by npm workspaces

# Show help if no target is given
help:
	@echo "Usage: make [target]"
	@echo "Available targets:"
	@echo "  install     Install all dependencies for all packages via npm workspaces"
	@echo "  clean       Remove all node_modules (keeps the root package-lock.json)"
	@echo "  test        Run tests for all packages via npm workspaces"
	@echo "  coverage    Run every package's tests; fails unless coverage is 100%"
	@echo "  pack-check  Fail if a package's tarball ships unexpected files or misses one it needs"
	@echo "  whoami      Show the current npm user (test registry authentication)"

.DEFAULT_GOAL := help

# Install all dependencies for all packages
install:
	npm install

# Remove every node_modules. Keep the root package-lock.json: it is the only
# tracked lockfile and CI's `npm ci` needs it. Any other lockfile (examples,
# or a stray one in a workspace package) is an untracked install leftover.
clean:
	rm -rf node_modules
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
	find . -name 'package-lock.json' -type f -not -path './package-lock.json' -delete

# Run tests for all packages
# (Assumes each package has a test script)
test:
	npm test --workspaces

# Coverage is internal: each package must stay at 100% statements, branches,
# functions and lines, or this target fails.
coverage:
	npm run coverage --workspaces

# Dry-run npm pack for every package and fail if a tarball leaks files outside
# its "files" allowlist (tests, generated output) or misses a file its code
# requires. See scripts/check-pack.js.
pack-check:
	node scripts/check-pack.js

# Show current npm user
whoami:
	npm whoami

.PHONY: help install clean test coverage pack-check whoami
