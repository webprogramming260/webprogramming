# Timeout and interval

## setTimeout

It is common to want to delay the execution of something until after a certain period has expired. JavaScript support this with the `setTimeout` function. **setTimeout** takes a function that will be called once the given milliseconds delay has passed. In the following example, the message is sent to the console log after waiting 2000 milliseconds.

```js
setTimeout(() => console.log('time is up'), 2000);

console.log('timeout will happen later');
```

It is important to realize that the JavaScript code continues to execute after setTimeout is called. Then, once the delay has expired, the JavaScript runtime will stop whatever JavaScript code is currently executing, run the setTimout callback function, and then return to the code that was halted previously. That is why the phrase **timeout will happen later** is printed before the timeout phrase is printed.

## setInterval

Sometimes you need to execute a block of code periodically at a given time interval. That is where the **setInterval** function comes into play. **setInterval** works in a similar manner as **setTimeout**, however it will continually call the function every time the delay has passed.

```js
setInterval(() => console.log('do something'), 1000);
```

You can cancel a setInterval request by capturing the result of the setInterval call and then passing that result to the `clearInterval` function. This is demonstrated by first setting a interval to print a message every second and then after five seconds clearing the interval.

```js
const interval = setInterval(() => console.log('do something'), 1000);

setTimeout(() => clearInterval(interval), 5000);
```
