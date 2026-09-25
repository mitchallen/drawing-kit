drawing-kit
==
digital drawing packages 
--

Published packages (GitHub Packages):

* [@mitchallen/pen-turtle](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen-turtle#readme)
* [@mitchallen/lsystem](https://github.com/mitchallen/drawing-kit/tree/main/packages/lsystem#readme)
* [@mitchallen/svg-tile](https://github.com/mitchallen/drawing-kit/tree/main/packages/svg-tile#readme)

Internal packages (private, not published). Each continues an older standalone
package, which stays on GitHub Packages frozen at the version shown for existing
users; the `-v2` suffix keeps the names from being confused:

| Internal package | Continues | Frozen at |
| --- | --- | --- |
| [@mitchallen/pen-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen#readme) | `@mitchallen/pen` | 0.3.1 |
| [@mitchallen/pen-svg-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen-svg#readme) | `@mitchallen/pen-svg` | 0.3.1 |
| [@mitchallen/demand-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/demand#readme) | `@mitchallen/demand` | 0.2.2 |
| [@mitchallen/fuse-svg-path-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/fuse-svg-path#readme) | `@mitchallen/fuse-svg-path` | 0.2.2 |

`pen-turtle` and `lsystem` use `pen-svg-v2` in their tests to write SVG output.
Their READMEs and the `examples/` apps still show the published
`@mitchallen/pen-svg`, since that is what someone outside this repo can install.
`npm publish --workspaces` skips the private packages.

* * *

## Monorepo Management

Lerna has been replaced by **npm workspaces** for managing this monorepo. All package management and bootstrapping should now be done using npm commands. See the npm documentation for more details on workspaces: https://docs.npmjs.com/cli/v8/using-npm/workspaces

* * *

## Archived Notes

The following notes are kept for historical reference only:

### Updates

* Due to changes in Lerna, I had to run these commands:

```sh
sudo npm install -g lerna
npm install --save lerna@latest
lerna repair

info cli using local version of lerna
lerna notice cli v8.1.2
lerna info versioning independent
Ran remove-invalid-use-workspaces from lerna
  Remove invalid `useWorkspaces` config from lerna.json as it no longer exists

  UPDATE lerna.json
---------------------------------------------------------

 Lerna   Successfully repaired your configuration. This workspace is up to date!
```

### Lerna again ...

Now Lerna is having a fit about using node 16

* Updated CI to 18 ...

### Lerna even again

I also had to remove this because it now causes CI failures:

```sh
npx lerna bootstrap
```

