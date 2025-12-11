# JavaScript arrow function

Because functions are first order objects in JavaScript they can be declared anywhere and passed as parameters. This results in code with lots of anonymous functions cluttering things up. To make the code more compact the `arrow` syntax was created. This syntax replaces the need for the `function` keyword with the symbols `=>` placed after the parameter declaration. The enclosing curly braces are also optional.

This is a function in arrow syntax that takes no parameters and always returns 3.

```js
() => 3;
```

The following two invocations of sort are equivalent.

```js
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

Besides being compact, the `arrow` function syntax has some important semantic differences from the standard function syntax. This includes how a return value is specified and the scope of variables that an arrow function can access.

## Return values

Arrow functions also have special rules for the `return` keyword. The return keyword is optional if no curly braces are provided for the function and it contains a single expression. In that case the result of the expression is automatically returned. If curly braces are provided then the arrow function behaves just like a standard function.

```js
() => 3;
// RETURNS: 3

() => {
  3;
};
// RETURNS: undefined

() => {
  return 3;
};
// RETURNS: 3
```

## Closure

Next, arrow functions inherit the `this` pointer from the scope in which they are created. This makes what is known as a `closure`. A closure allows a function to continue referencing its creation scope, even after it has passed out of that scope. This can be tricky to wrap your head around, but just remember that a closure includes a function and its creation scope.

The function `makeClosure` returns an anonymous function using the arrow syntax. The function create a variable from an initialization parameter. Both the parameter and the locally scoped variables are included in closure for the returned function.

```js
function makeClosure(init) {
  let closureValue = init;
  return () => {
    return `closure ${++closureValue}`;
  };
}
```

Now, when we call the **createClosure** function it returns the arrow function that includes the closure of the variables that existed when it was created. That is why the closure function can reference a variable that is declared outside of the scope that it executes in. We demonstrate this by calling the closure function multiple times with different resulting values.

```js
const closure = makeClosure(0);

console.log(closure());
// OUTPUT: closure 1

console.log(closure());
// OUTPUT: closure 2
```

Closures provide a valuable property when we do things like execute JavaScript within the scope of an HTML page. This is because it remembers the values of variables that were in scope when the function was created.

## Using arrow functions with React

React components are a great place to learn how to use arrow functions. The following is a simple React application that increments and decrements a counter when the appropriate buttons are pressed. This code uses standard JavaScript functions.

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  function Increment() {
    setCount(count + 1);
  }

  function Decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={Increment}>n++</button>
      <button onClick={Decrement}>n--</button>
    </div>
  );
}
```

By using arrow functions the counter logic can be moved directly into the JSX. This makes the code much more concise and actually clarifying what the buttons are doing.

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>n++</button>
      <button onClick={() => setCount(count - 1)}>n--</button>
    </div>
  );
}
```

There is however, a problem with this code. Setting state with the function provided by the React useState function is asynchronous. That means you don't know if other, concurrently running code, has changed the value of **count** between when you read it and when you set it. That can lead to the counter being incremented multiple time in some cases or not at all in others. To fix this we need to supply an arrow function to the setCount function that sets the state instead of simply supplying the desired value. The following compares the two versions.

```jsx
// may corrupt value
setCount(count + 1);

// safe
setCount((prevCount) => prevCount + 1);
```

This works because React can control when the state variable is updated instead of allowing your code to do the read operation. Our counter app now looks like this:

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>n++</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>n--</button>
    </div>
  );
}
```

However, our nice concise code is now looking a little clunky as we put more duplicated logic inline for the **onClick** handler. We can fix this by moving the creation of the arrow function out of the JSX and in to the component body. At the same time let's reduce the duplication of code caused by the different counter operations and make it easy to add new operations by using the factory pattern to create our operations. Notice the use of closure to reference the operation that is used by the arrow function that is returned from the factory.

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  function counterOpFactory(op) {
    return () => setCount((prevCount) => op(prevCount));
  }

  const incOp = counterOpFactory((c) => c + 1);
  const decOp = counterOpFactory((c) => c - 1);
  const tenXOp = counterOpFactory((c) => c * 10);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incOp}>n++</button>
      <button onClick={decOp}>n--</button>
      <button onClick={tenXOp}>n*10</button>
    </div>
  );
}
```

This results in concise, simple, thread safe code in a functional programming style.

## An advanced example

If you are still wanting more, take a look at this complex example that demonstrates the use of functions, arrow functions, parameters, a function as a parameter (callback), closures, and browser event listeners. This is done by implementing a `debounce` function.

The point of a debounce function is to only execute a specified function once within a given time window. Any requests to execute the debounce function more frequently than this will case the time window to reset. This is important in cases where a user can trigger expensive events thousands of times per second. Without a debounce the performance of your application can greatly suffer.

The following code calls the browser's `window.addEventListener` function to add a callback function that is invoked whenever the user scrolls the browser's web page. The first parameter to `addEventListener` specifies that it wants to listen for `scroll` events. The second parameter provides the function to call when a scroll event happens. In this case we call a function named `debounce`.

The debounce function takes two parameters, the time window for executing the window function, and the window function to call within that limit. In this case we will execute the arrow function at most every 500 milliseconds.

```js
window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);
```

The debounce function implements the execution of windowFunc within the restricted time window by creating a closure that contains the current timeout and returning a function that will reset the timeout every time it is called. The returned function is what the scroll event will actually call when the user scrolls the page. However, instead of directly executing the `windowFunc` it sets a timer based on the value of `windowMs`. If the debounce function is called again before the window times out then it resets the timeout.

```js
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```

You can experiment with this in [CodePen](https://codepen.io/leesjensen/pen/XWxVBRx). In this example, the background color will change as long as the user is scrolling. When they stop the background reverts back to white.
