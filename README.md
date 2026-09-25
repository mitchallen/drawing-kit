drawing-kit
==
digital drawing packages 
--

Packages in this monorepo, all published to GitHub Packages:

* [@mitchallen/pen-turtle](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen-turtle#readme)
* [@mitchallen/lsystem](https://github.com/mitchallen/drawing-kit/tree/main/packages/lsystem#readme)
* [@mitchallen/svg-tile](https://github.com/mitchallen/drawing-kit/tree/main/packages/svg-tile#readme)
* [@mitchallen/pen-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen#readme)
* [@mitchallen/pen-svg-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen-svg#readme)
* [@mitchallen/demand-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/demand#readme)
* [@mitchallen/fuse-svg-path-v2](https://github.com/mitchallen/drawing-kit/tree/main/packages/fuse-svg-path#readme)

The four `-v2` packages continue older standalone packages. Those stay on GitHub
Packages, frozen, for existing users; the `-v2` suffix keeps the names apart:

| Package | Continues | Frozen at |
| --- | --- | --- |
| `@mitchallen/pen-v2` | `@mitchallen/pen` | 0.3.1 |
| `@mitchallen/pen-svg-v2` | `@mitchallen/pen-svg` | 0.3.1 |
| `@mitchallen/demand-v2` | `@mitchallen/demand` | 0.2.2 |
| `@mitchallen/fuse-svg-path-v2` | `@mitchallen/fuse-svg-path` | 0.2.2 |

`pen-svg-v2` depends on `demand-v2` and `fuse-svg-path-v2`, with `pen-v2` as a
peer. `lsystem` depends on `pen-turtle`; `pen-turtle` and `lsystem` use
`pen-svg-v2` to write SVG output in their tests and examples.

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

