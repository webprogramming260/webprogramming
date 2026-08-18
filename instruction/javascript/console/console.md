# JavaScript console

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQoB8WuY767Ffo14sjSc7k7pIvWOazHFhYpAcdrgqaSBEo8pl5LB54-Cq4fTpW5bdZfFNrlNVQ6hxwK/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="900" height="540" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

📖 **Deeper dive reading**: [MDN JavaScript Console](https://developer.mozilla.org/en-US/docs/Web/API/console)

The JavaScript console object provides interaction with the JavaScript runtime's debugger console. This usage of console should not be confused with your operating system's console (AKA terminal or command line). The console object provides functionality for outputting the value of text and objects, running timers, and counting iterations. These are useful debugging tools when you can actually execute your code in an interactive debugger (such as VS Code).

## Log

The basic usage of the console object is to output a log message.

```js
console.log('hello');
// OUTPUT: hello
```

You can create formatted messages in the log parameter.

```js
console.log('hello %s', 'world');
// OUTPUT: hello world
```

You can even specify CSS declarations in order to style the log output.

```js
console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
// OUTPUT: JavaScript Demo //in large green text
```

## Timers

If you are trying to see how long a piece of code is running you can wrap it with `time` and `timeEnd` calls and it will output the duration between the `time` and `timeEnd` calls.

```js
console.time('demo time');
for (let i = 0; i < 10000000; i++) {}
// ... some code that takes a long time.
console.timeEnd('demo time');
// OUTPUT: demo time: 12.74 ms
```

## Count

To see how many times a block of code is called you can use the `count` function.

```js
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1
```

## Experiment

Use the **JavaScript Interpreter**, or the console pane in the browser debugger, to experiment with different console.log commands.


```masteryls
{"id":"e91229cd-b212-437c-becf-f32950a9b985", "type":"web-page", "height":650, "file":"../introduction/javascriptPlayground.html" }
```

## Reflect

```masteryls
{"id":"f79f6d59-ba17-418d-a8f3-e3ea16baaee4", "title":"Why console.log?", "type":"essay" }
What purpose does **console.log** provide when building software? Are there better tools than using console.log?
```
