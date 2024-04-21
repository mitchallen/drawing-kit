drawing-kit
==
digital drawing packages 
--

<a href='https://ko-fi.com/A0A0KEIOY' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

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