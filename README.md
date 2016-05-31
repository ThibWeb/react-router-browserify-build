react-router-browserify-build
=============================

> Highlights an issue when building projects using [react-router V2](https://github.com/reactjs/react-router) with [Browserify](http://browserify.org).

## The issue

(Warning: big file) L248 of https://github.com/ThibWeb/react-router-browserify-build/blob/master/bundle.js#L248.

When using `browserify` to bundle a project that uses `react-router`, the default configuration of browserify transforms causes around 3kb of minified/gzipped warning messages to end up in the production bundles.

The source of the problem is that by default browserify transforms do not run on packages in `node_modules`. Configuring those to run on the whole bundle is simple, but I believe [this is counter-intuitive to the common "best practices](https://github.com/babel/babelify#why-arent-files-in-node_modules-being-transformed)", and people might overlook this.

### Reproduction

```
npm run start
# Or
NODE_ENV=production browserify index.js -t [ babelify ] -t [ envify ] > bundle.js
```

https://github.com/ThibWeb/react-router-browserify-build/blob/master/bundle.js#L26

## The fix

### On the command line

Use the `-g` or `--global-transform` flag to run `envify` or `loose-envify` on the whole bundle:

```
NODE_ENV=production browserify index.js -t [ babelify ] -g [ envify ] > bundle.js
```

### With the API

Use the `global flag`:

```js
b.transform(envify, { global: true });
// Or as configuration:
{
    transform: [
        [
            envify,
            { global: true },
        ],
    ],
}
```
