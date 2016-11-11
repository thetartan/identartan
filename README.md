# Identartan

This library allows to generate tartan pattern from arbitrary string in
identicon style (therefore its name is a combination of two words - 
Ident Tartan - in the same manner). Library can be used as standalone module, 
or as a plugin for [tartan](https://github.com/thetartan/tartan) library. 
In the second case it will be available as `tartan.schema.identartan` instead of 
exporting function. 

## Install

To use library in your projects, run `npm install identartan`. Sources are 
available in `/src` directory, and pre-build bundles will be available 
in `/dist` directory after installation.
 
## Usage

Add `dist/identartan.js` or `dist/identartan.min.js` to your page and use
global `identartan` variable to access library API.

To use this library in CommonJS style use `require`:
```javascript
var tartan = require('tartan');
require('identartan');

// Now you can access library
console.log(tartan.schema.identartan.version);
```

## Examples
 
Run `npm start` or open `index.html` in your favorite browser to see 
live example of some features of this library.
