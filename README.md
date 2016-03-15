# Makeus React Web App - react.js + flux-utils


## Features
* Heavily commented webpack configuration with reasonable defaults
* JSX, ES6, and ES7 support with babel.js
* Source maps included in all builds
* Development server with hot reload when possible and refresh otherwise
* Production builds with cache busting and asset minification
* Testing environment using karma to run tests and mocha as the framework
* Code coverage when tests are run
* No gulp and no grunt, just npm run-scripts

## Installation
```shell
$ sudo npm install -g npm
```

```shell
$ npm install
```

## Scripts

All scripts are run with `npm run [script]`, for example: `npm run test`.

* `build` - generate a minified build to public folder
* `dev` - start development server, try it by opening `http://localhost:8080/`
* `test` - run all tests
* `test:unit` - run all unit tests
* `test:unit:live` - continuously run unit tests watching for changes

See what each script does by looking at the `scripts` section in [package.json](./package.json).

## Linting
* Use WebStrom ESLint Plugin 

## Testing
* karma mocha expect expect-jsx
