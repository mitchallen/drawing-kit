drawing-kit
==
digital drawing packages 
--

Packages in this monorepo:

* [@mitchallen/pen-turtle](https://github.com/mitchallen/drawing-kit/tree/main/packages/pen-turtle#readme)
* [@mitchallen/lsystem](https://github.com/mitchallen/drawing-kit/tree/main/packages/lsystem#readme)
* [@mitchallen/svg-tile](https://github.com/mitchallen/drawing-kit/tree/main/packages/svg-tile#readme)

* * *

## Updates

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

## Lerna again ...

Now Lerna is having a fit about using node 16

* Updated CI to 18 ...

## Lerna even again

I also had to remove this because it now causes CI failures:

```sh
npx lerna bootstrap
```

