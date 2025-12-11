# Adding JavaScript to HTML

You can insert JavaScript into HTML with one of three ways:

1. **Script block**: Directly including it in the HTML within the content of a `<script>` element
1. **External code**: Using the `src` attribute of the script element to reference an external JavaScript file.
1. **Inline event attribute**: Putting JavaScript directly inline as part of an event attribute handler.

**index.js**

```js
function sayHello() {
  alert("Hello");
}
```

**index.html**

```html
<!-- external script -->
<head>
  <script src="index.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>

  <!-- internal script block -->
  <script>
    function sayGoodbye() {
      alert("Goodbye");
    }
  </script>

  <!-- inline attribute handler -->
  <script>
    let i = 1;
  </script>
  <button onclick="alert(`i = ${i++}`)">counter</button>
</body>
```

Notice that we call the `sayHello` and `sayGoodbye` JavaScript functions from the HTML in the `onclick` attribute of the button element. Special attributes like `onclick` automatically create event listeners for different DOM events that call the code contained in the attribute's value. The code specified by the attribute value can be a simple call to a function or any JavaScript code.
