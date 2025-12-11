# JavaScript modules

📖 **Deeper dive reading**: [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

JavaScript modules allow for the partitioning and sharing of code. Initially JavaScript had no support for modules. Node.js, a server side JavaScript execution application, introduced the concept of modules in order to support the importing of packages of JavaScript from third party providers.

JavaScript got full module support with ES6, and they have become the standard module representation as [browser support](https://caniuse.com/es6-module-dynamic-import) for ES modules is now almost universal.

Because of the complex history of modules they can be a confusing topic, but it is well worth the time to understand how they work as they are a core piece of a web programmer's toolkit. In order to differentiate between the two implementations, Node.js modules are called CommonJS modules, and JavaScript modules are called ES modules. The import and export syntax for ES modules is the major difference between the two formats. Let's start with CommonJS modules first.

## Common JS modules

Because modules create a file-based scope for the code they represent, you must explicitly `export` the objects from one file and then `import` them into another file. To import a module with CommonJS you use the format:

```js
const X = require('y');
```

For example, the following imports the Express library that was installed using NPM, and an object named DB that was exported from the local file `./database.js`.

```
const express = require('express');
const DB = require('./database.js')
```

If you want to export something from your own code then you would use the `module.exports` global variable. For example, here is a simple module that exports a function that displays an alert.

```js
function alertDisplay(msg) {
  alert(msg);
}

module.exports = {
  alertDisplay,
};
```

## ES Modules

In order to use ES Modules with Node.js you need to specify this in you package.json file as follows.

```json
{
  "name": "service",
  "version": "1.0.0",
  "description": "This demonstrates a service for a web application.",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

To import a module with ES modules you use the format:

```js
import X from 'y';
```

For example, the following imports the Express package that was installed using NPM.

```js
import express from 'express';

express().listen(3000);
```

If you want to export something from your own code then you would use the `export` keyword. For example, here is a simple module that exports a function that displays an alert.

**alert.js**

```js
export function alertDisplay(msg) {
  console.log(msg);
}
```

You can import the module's exported function into another module using the `import` keyword.

**main.js**

```js
import { alertDisplay } from './alert.js';

alertDisplay('called from main.js');
```

## ES Modules in the browser

When you use ES modules in the browser via HTML script references, things get a little complicated. The key thing to understand is that modules can only be called from other modules. You cannot access JavaScript contained in a module from the global scope that your non-module JavaScript is executing in.

From your HTML, you can specify that you are using an ES module by including a `type` attribute with the value of `module` in the `script` element. You can then import and use other modules. This is shown in the example below.

**index.html**

```html
<script type="module">
  import { alertDisplay } from './alert.js';
  alertDisplay('module loaded');
</script>
```

If we want to use a module in the global scope that our HTML or other non-module JavaScript is executing in, then we must leak it into the global scope. We do this by either attaching an event handler or explicitly adding a function to the global window object. In the example below, we expose the `alertDisplay` imported module function by attaching it to the global JavaScript `window` object so that it can then be called from the button `onclick` handler. We also expose the module function by attaching a `keypress` event.

**index.html**

```html
<html>
  <body>
    <script type="module">
      import { alertDisplay } from './alert.js';
      window.btnClick = alertDisplay;

      document.body.addEventListener('keypress', function (event) {
        alertDisplay('Key pressed');
      });
    </script>
    <button onclick="btnClick('button clicked')">Press me</button>
  </body>
</html>
```

Now, if the button is pushed or a key is pressed our ES module function will be called.

### ES Modules with web frameworks

Fortunately, when you use a web framework bundler, discussed in later instruction, to generate your web application distribution code, you usually don't have to worry about differentiating between global scope and ES module scope. The bundler will inject all the necessary syntax to connect your HTML to your modules. Historically, this was done by removing the modules and placing all of the JavaScript in a namespaced global partition. Now that ES Modules are supported on most browsers, the bundler will expose the ES module directly.
