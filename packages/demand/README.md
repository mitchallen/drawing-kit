@mitchallen/demand-v2
===============================

A module to throw errors if conditions aren't met.
----------------------------------------------------

<p>
  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml?query=branch%3Amain">
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Coverage: 100%">
  </a>

  <a href="https://github.com/users/mitchallen/packages/npm/package/demand-v2">
    <img src="https://img.shields.io/github/package-json/v/mitchallen/drawing-kit?filename=packages%2Fdemand%2Fpackage.json&label=GitHub%20Packages" alt="Version">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg" alt="License">
  </a>

</p>

> `@mitchallen/demand-v2` continues `@mitchallen/demand`, which stays on GitHub Packages frozen at 0.2.2. It is developed in the [drawing-kit](https://github.com/mitchallen/drawing-kit) monorepo.

* * *

## Installation

This package is published to __GitHub Packages__, not the public npm registry.

Add an `.npmrc` next to your `package.json`:

    @mitchallen:registry=https://npm.pkg.github.com

GitHub Packages requires authentication even for public packages, so you also need a
personal access token with the `read:packages` scope. Keep it in an environment
variable rather than committing it:

    //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

Then:

```sh
$ npm init
$ npm install @mitchallen/demand-v2
```

* * *

## Usage

    var demand = require('@mitchallen/demand-v2');

 	database.connect(uri, function(err,db) {

 		demand.notError(err);

		demand.notNull(db,"ERROR: db is null");
 	});

* * * 

## Methods

### notNull(object, message)

Will throw an error containing the *message* parameter if the *object* parameter is null;

### notError(err)

Will throw an error if the *err* object is not null. The error will use the string from __err.message__.

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [github.com/mitchallen/demand.git](https://github.com/mitchallen/demand.git)
 
* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.2.0 release notes

* now published to __GitHub Packages__ instead of npmjs.org
* replaced __unit.js__ with __should.throws__ in the test suite
* removed the Grunt toolchain
* mocha is now a devDependency -- `npm test` previously fell back to a global install
* upgraded __should__ to 13.x
* replaced the __.npmignore__ blocklist with a __files__ allowlist
* added an __engines__ field (Node.js 18+)

#### Version 0.1.3 release notes

* __notNull__ now distinguishes between null and zero

#### Version 0.1.2 release notes

* Added pushTo to Gruntfile

#### Version 0.1.1 release notes

* Fixed type-o in README example

#### Version 0.1.0 release notes

* Initial release