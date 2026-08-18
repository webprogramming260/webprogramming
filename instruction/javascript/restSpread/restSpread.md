# JavaScript rest and spread

📖 **Deeper dive reading**:

- [MDN Rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [MDN Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Rest

Sometimes you want a function to take an unknown number of parameters. For example, if you wanted to write a function that checks to see if some number in a list is equal to a given number, you could write this using an array.

```js
function hasNumber(test, numbers) {
  return numbers.some((i) => i === test);
}

const a = [1, 2, 3];
hasNumber(2, a);
// RETURNS: true
```

However sometimes you don't have an array to work with. In this case you could create one on the fly.

```js
function hasTwo(a, b, c) {
  return hasNumber(2, [a, b, c]);
}
```

But JavaScript provides the `rest` syntax to make this easier. Think of it as a parameter that contains the `rest` of the parameters. To turn the last parameter of any function into a `rest` parameter you prefix it with three periods. You can then call it with any number of parameters and they are all automatically combined into an array.

```js
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

Note that you can only make the last parameter a `rest` parameter. Otherwise JavaScript would not know which parameters to combine into the array.

Technically speaking, `rest` allows JavaScript to provide what is called variadic functions.

## Spread

Spread does the opposite of rest. It take an object that is iterable (e.g. array or string) and expands, or spreads, it into a function's parameters. Consider the following.

```js
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

This type of manipulation maked common tasks very easy to do in JavaScript.

### Shallow Copying vs. Deep Copying
The spread operator creates a **shallow copy** of an object or array. This means that while the top-level properties are duplicated, any nested objects or arrays are still passed by reference.

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

copy.b.c = 99; 
console.log(original.b.c); // 99 (The nested object was not truly cloned)
```

### Property Overwriting and Merging
When merging objects using the spread operator, the order of operations matters. If multiple objects share the same key, the value from the **last** object spread will overwrite previous values.

```javascript
const defaults = { theme: 'light', fontSize: 12 };
const userSettings = { fontSize: 16 };

const finalConfig = { ...defaults, ...userSettings };
// Result: { theme: 'light', fontSize: 16 }
```

### Spreading Strings into Arrays
The spread operator can be used on any iterable, including strings. This provides a concise way to convert a string into an array of individual characters.

```javascript
const greeting = "Hello";
const charArray = [...greeting]; 
// Result: ['H', 'e', 'l', 'l', 'o']
```

### Spreading into Function Arguments
Spread is frequently used to pass elements of an array as individual arguments to functions that do not accept arrays directly, such as `Math.max()` or `Math.min()`.

```javascript
const scores = [85, 92, 78, 95];
const highestScore = Math.max(...scores); 
// Equivalent to Math.max(85, 92, 78, 95)
```

### Immutability in State Management
In frameworks like React, the spread operator is a standard tool for updating state without mutating the original state object. It allows you to "copy and update" in a single expression.

```javascript
const [user, setUser] = useState({ name: 'Alice', role: 'User' });

// Updating only the role while preserving the name
setUser({ ...user, role: 'Admin' });
```

### Working with Iterables (Sets and Maps)
The spread operator works on all JavaScript iterables. This makes it the most efficient way to convert a `Set` (which stores unique values) back into an `Array`.

```javascript
const uniqueNumbers = new Set([1, 2, 2, 3]);
const array = [...uniqueNumbers]; 
// Result: [1, 2, 3]
```

## Exercises


````masteryls
{"id":"ad615866-c70c-4d0c-9cce-33c29c48f94d", "title":"Spread Operator with matchAll", "type":"multiple-choice"}
In JavaScript, the `String.matchAll()` method returns an iterator rather than an array. When a developer uses the spread operator (`...`) on the result of a `matchAll()` call, what is the structure of the resulting variable?

```javascript
const input = "Ref10, Ref20, Ref30";
const regex = /Ref(\d+)/g;
const matches = [...input.matchAll(regex)];
```

- [ ] A flat array of strings containing only the full matches: `["Ref10", "Ref20", "Ref30"]`
- [x] An array of match arrays, where each sub-array contains the full match, any capture groups, and properties like `index` and `input`
- [ ] A single string containing all matches concatenated together: `"Ref10Ref20Ref30"`
- [ ] A nested object where the keys are the integer capture groups and the values are the spread-out character sequences
````
