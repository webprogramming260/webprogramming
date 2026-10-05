# JavaScript types, conditionals, and loops

📖 **Deeper dive reading**: [MDN Data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

## Declaring variables

Variables are declared using either the `let` or `const` keyword. `let` allows you to change the value of the variable while `const` will cause an error if you attempt to change it.

```js
let x = 1;

const y = 2;
```

Originally JavaScript used the keyword `var` to define variables. This has been deprecated because it causes hard-to-detect errors in code related to the scope of the variable. You should avoid `var` and always declare your variables either with `let` or `const`.

## Type

JavaScript defines several primitive types.

| Type        | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| `Null`      | The type of a variable that has not been assigned a value. |
| `Undefined` | The type of a variable that has not been defined.          |
| `Boolean`   | true or false.                                             |
| `Number`    | A 64-bit signed number.                                    |
| `BigInt`    | A number of arbitrary magnitude.                           |
| `String`    | A textual sequence of characters.                          |
| `Symbol`    | A unique value.                                            |

Of these types Boolean, Number, and String are the types commonly thought of when creating variables. However, variables may refer to the Null or Undefined primitive. Because JavaScript does not enforce the declaration of a variable before you use it, it is entirely possible for a variable to have the type of Undefined.

In addition to the above primitives, JavaScript defines several object types. Some of the more commonly used objects include the following:

| Type       | Use                                                                                    | Example                  |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------ |
| `Object`   | A collection of properties represented by name-value pairs. Values can be of any type. | `{a:3, b:'fish'}`        |
| `Function` | An object that has the ability to be called.                                           | `function a() {}`        |
| `Date`     | Calendar dates and times.                                                              | `new Date('1995-12-17')` |
| `Array`    | An ordered sequence of any type.                                                       | `[3, 'fish']`            |
| `Map`      | A collection of key-value pairs that support efficient lookups.                        | `new Map()`              |
| `JSON`     | A lightweight data-interchange format used to share information across programs.       | `{"a":3, "b":"fish"}`    |

## Common operators

When dealing with a number variable, JavaScript supports standard mathematical operators like `+` (add), `-` (subtract), `*` (multiply), `/` (divide), and `===` (equality). For string variables, JavaScript supports `+` (concatenation) and `===` (equality).

## Type conversions

JavaScript is a dynamically typed language. That means that a variable always has a type, but the variable can change type when it is assigned a new value, or that types can be automatically converted based upon the context that they are used in. Sometimes the results of automatic conversions can be unexpected from programmers who are used to strongly typed languages. Consider the following examples.

```js
2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
```

Getting unexpected results is especially common when dealing with the [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) operator.

```js
1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true
```

Unexpected results happen in JavaScript because it uses [complex rules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#strict_equality_using) for defining equality that depend upon the conversion of a type to a boolean value. You will sometimes hear this referred to as [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) evaluations. To remove this confusion, JavaScript introduced the strict equality (===) and inequality (!==) operators. The strict operators skip the type conversion when computing equality. This results in the following.

```js
1 === '1';
// OUTPUT: false
null === undefined;
// OUTPUT: false
'' === false;
// OUTPUT: false
```

Because strict equality is considered more intuitive, it is almost always preferred and should be used in your code.

Here is a fun example of JavaScript's type conversion. Execute the following in the browser's debugger console.

```js
('b' + 'a' + +'a' + 'a').toLowerCase();
```

## Conditionals

JavaScript supports many common programming language conditional constructs. This includes `if`, `else`, and `if else`. Here are some examples.

```js
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}
```

You can also use the ternary operator. This provides a compact `if else` representation.

```js
a === 1 ? console.log(1) : console.log('not 1');
```

You can use boolean operations in the expression to create complex predicates. Common boolean operators include `&&` (and), `||` (or), and `!` (not). These operators **short-circuit**: if the left side of `||` is true, or the left side of `&&` is false, the result is already known, so JavaScript doesn't evaluate the right side at all.

```js
if (true && (!false || true)) {
  //...
}
```

## Loops

JavaScript supports many common programming language looping constructs. This includes `for`, `for in`, `for of`, `while`, `do while`, and `switch`. Here are some examples.

### for

Note the introduction of the common post increment operation (`i++`) for adding one to a number.

```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

### do while

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1
```

### while

```js
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```

### for in

The `for in` statement iterates over an object's property names.

```js
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
```

For arrays the object's name is the array index.

```js
const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1
```

### for of

The `for of` statement iterates over an iterable's (Array, Map, Set, ...) property values.

```js
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

### Break and continue

All of the looping constructs demonstrated above allow for either a `break` or `continue` statement to abort or advance the loop.

```js
let i = 0;
while (true) {
  console.log(i);
  if (i === 0) {
    i++;
    continue;
  } else {
    break;
  }
}
// OUTPUT: 0 1
```

## Exercises

````masteryls
{"id":"87c7299d-9eb3-4c1a-a14c-5686f805f141", "title":"Short-circuit Evaluation in JavaScript", "type":"multiple-choice"}
Consider the following JavaScript code snippet:

```js
let a = 10;
let b = 5;

if (a > 5 || ++b > 10) {
  a += 2;
}
```

What are the final values of `a` and `b` after this code block has finished executing?

- [ ] `a = 12, b = 6`
  You correctly figured out that the `if` body runs and `a` becomes 12.

  `++b` never runs, though. Because `a > 5` is already true, `||` doesn't evaluate its right side.

  Reread the lesson's explanation of short-circuit evaluation.

- [x] `a = 12, b = 5`
  **Correct!** `a > 5` is true, so the whole `||` expression is already true.

  JavaScript skips the right side, so `++b` never runs and `b` stays 5. Then the body adds 2 to `a`. Be careful about putting side effects, like `++`, in the right side of `||` or `&&`, because they might not happen.

- [ ] `a = 10, b = 5`
  You correctly noticed that `b` isn't changed.

  The `if` body does run, though, because `a > 5` is true. So `a` becomes 12.

  Trace the condition again, starting with `a > 5`.

- [ ] `a = 10, b = 6`
  Good effort. Tracing increment operators in conditions is tricky.

  Both values are wrong here, though. The condition is true, so `a` changes, and `||` short-circuits, so `b` doesn't.

  Reread the lesson's explanation of short-circuit evaluation.
````


```masteryls
{"id":"d0dfb8f6-7b0b-45ed-b6ed-27b041440f7f", "title":"Strict vs. Loose Equality", "type":"essay"}
In JavaScript, what is the result of evaluating the expressions `5 == "5"` and `5 === "5"`, and why?
```

````masteryls
{"id":"45a11ede-ba2a-4c74-892f-0398d542214a", "title":"JavaScript for...in iteration", "type":"multiple-choice"}
Consider the following JavaScript code snippet:

```javascript
const settings = {
  theme: "dark",
  notifications: true,
  version: 1.2
};

for (let item in settings) {
  console.log(item);
}
```

What will be logged to the console during the execution of this loop?

- [ ] The values associated with the keys: `"dark"`, `true`, and `1.2`
  Good effort. Getting values is a common goal when looping over an object.

  `for in` gives you the property *names*, though. To get the values, you'd use `settings[item]` or `Object.values()`.

  Reread the *for in* section.

- [x] The names of the enumerable properties (keys): `"theme"`, `"notifications"`, and `"version"`
  **Correct!** `for in` iterates over an object's property names.

  To work with the values as well, use `settings[item]` inside the loop. And to loop over an *array's* values, prefer `for of`, which avoids the confusion of getting indexes as strings.

- [ ] The numeric index of each property: `0`, `1`, and `2`
  You're thinking of how `for in` behaves with arrays, where the keys are indexes.

  This is a plain object, though, so its keys are the property names.

  Revisit the *for in* section and its example.

- [ ] Both the keys and values as arrays: `["theme", "dark"]`, `["notifications", true]`, and `["version", 1.2]`
  Good effort. Getting key-value pairs is useful.

  That's what `Object.entries()` provides, though, not `for in`.

  Reread the *for in* section.
````
