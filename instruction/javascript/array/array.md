# JavaScript array

📖 **Deeper dive reading**: [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

In JavaScript, an array is a high-level, list-like object used to store a collection of items. Unlike some lower-level languages where arrays are fixed-size blocks of memory, JavaScript arrays are dynamic; they can grow or shrink in size automatically and can even hold a mix of different data types, such as strings, numbers, and even other objects or arrays.

JavaScript array objects represent a sequence of other objects and primitives. You can reference the members of the array using a zero based index. You can create an array with the Array constructor or using the array literal notation shown below.

```js
const a = [1, 2, 3];
console.log(a[1]);
// OUTPUT: 2

console.log(a.length);
// OUTPUT: 3
```

## The benefits of using arrays

JavaScript arrays come with a robust set of built-in methods that simplify data manipulation. This "batteries-included" approach is one of the primary reasons they are the go-to data structure for most developers.

- **Dynamic Sizing:** You don't need to know the number of elements in advance. JavaScript handles memory allocation as you add or remove items.
- **Rich API:** Methods like `.map()`, `.filter()`, and `.reduce()` allow for functional programming patterns that make code more readable and maintainable.
- **Ordered Storage:** Arrays maintain the insertion order of elements, which is critical for tasks like rendering a list of UI components or processing a queue of events.
- **Performance for End-Operations:** Adding (`push`) or removing (`pop`) items from the end of an array is extremely fast (O(1) complexity).

## Array functions

The Array object has several interesting static functions associated with it. Here are some of the interesting ones.

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => i < 1)`          |

```js
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4
```

## Common pain points and performance gotchas

While versatile, JavaScript arrays have specific behaviors that can lead to performance bottlenecks or bugs if not properly understood.

1.  **Re-indexing Overhead:** While `push` and `pop` are fast, operations at the beginning of the array—like `unshift` and `shift`—are slow (O(n)). This is because every single subsequent element must be moved to a new index to accommodate the change.
2.  **Sparse Arrays:** If you assign a value to a high index (e.g., `arr[100] = 'x'`) in an array with only 2 elements, JavaScript creates "holes" or empty slots. This can lead to unexpected behavior when using iteration methods like `forEach`.
3.  **Reference Type Confusion:** Arrays are objects. When you assign an array to a new variable, you are copying the _reference_, not the data itself. Modifying the new variable will affect the original array.
4.  **Lack of Type Safety:** In standard JavaScript, there is nothing stopping a developer from accidentally pushing a string into an array intended only for numbers, which can cause runtime errors in complex logic.

```javascript
// The Performance Pitfall: Shifting
const largeArray = new Array(1000000).fill(0);

console.time('shift');
largeArray.shift(); // Very slow: 999,999 elements must be moved!
console.timeEnd('shift');

console.time('pop');
largeArray.pop(); // Very fast: No re-indexing required
console.timeEnd('pop');
```

```masteryls
{"id":"3aa165a2-34b3-4395-a23a-e8c5018785e0", "title":"Array Operation Efficiency", "type":"multiple-choice"}
Which of the following operations is generally the most computationally expensive for a large JavaScript array?

- [ ] Accessing an element by its index (e.g., `arr[500]`)
- [ ] Adding an element to the end of the array using `.push()`
- [x] Removing the first element of the array using `.shift()`
- [ ] Removing the last element of the array using `.pop()`
```

## ☑ Assignment

Create a function named `testAll` that takes two parameters. The first parameter is an input array. The second parameter is a tester function that checks all the values of the input array. If the tester function returns true for each value in the input array, then `testAll` returns true.

Call `testAll` with an array of strings as the first parameter and an arrow function that returns true if the input has a length greater than 3.

Output the result of the call to `testAll` with the `console.log` function.

Here is a template for you to start with.

```js
function testAll(input, tester) {
  const result = // Your code here
  return result
}

const result = testAll(/* Your parameters here */);

console.log(result);
```

```masteryls
{"id":"c0e860ee-dea3-4211-8b96-aa97828347b8", "title":"testAll", "type":"essay" }
Place your solution here to get feedback.
```
