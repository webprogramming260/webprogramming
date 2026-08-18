# JavaScript string

📖 **Deeper dive reading**: [MDN String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

Strings are a primitive type in JavaScript. A string variable is specified by surrounding a sequence of characters with single quotes (`'`), double quotes (`"`), or backticks (`` ` ``). The meaning of single or double quotes are equivalent, but the backtick defines a string literal that may contain JavaScript that is evaluated in place and concatenated into the string. A string literal replacement specifier is declared with a dollar sign followed by a curly brace pair. Anything inside the curly braces is evaluated as JavaScript. You can also use backticks to create multiline strings without having to explicitly escape the newline characters using `\n`.

```js
'quoted text'; // " also works

const l = 'literal';
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text
```

## Unicode support

JavaScript supports Unicode by defining a string as a sequence of 16-bit unsigned integers that represent UTF-16-encoded characters. Unicode support allows JavaScript to represent most languages spoken on the planet. This includes those that are read from right to left.

> حجر
>
> أقول لهذا الحجر: أنا أنت. فيقول: لستَ مرناً الى هذا الحدّ. أقول: قلبي مثلك؟ فيقول:

However, there are several important steps you must take in order to make your web application fully internationalized. This includes handling of currency, time, dates, iconography, units of measure, keyboard layouts, and respecting local customs. Read this [article on the W3C website](https://www.w3.org/standards/webdesign/i18n) to learn more about internationalization.

## String functions

The string object has several interesting functions associated with it. Here are some of the commonly used ones.

| Function      | Meaning                                                      |
| ------------- | ------------------------------------------------------------ |
| length        | The number of characters in the string                       |
| indexOf()     | The starting index of a given substring                      |
| split()       | Split the string into an array on the given delimiter string |
| startsWith()  | True if the string has a given prefix                        |
| endsWith()    | True if the string has a given suffix                        |
| includes()    | True if the string contains a given substring                |
| slice()       | Extracts a section of a string and returns a new string      |
| trim()        | Removes whitespace from both ends of a string                |
| replace()     | Replaces a pattern with a replacement string                 |
| toLowerCase() | Converts all characters to lowercase                         |
| toUpperCase() | Converts all characters to uppercase                         |

```js
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

## Immutability
In JavaScript, strings are **immutable**. Once a string is created, its individual characters cannot be changed. Any operation that appears to modify a string actually returns a completely new string.

```javascript
let text = "Hello";
text[0] = "h"; // This will not change 'text'
console.log(text); // Output: "Hello"

text = text.toUpperCase(); // Creates a new string and reassigns it
```

## Template Literals
JavaScript string can be created with the template literal systax. This uses backticks (`` ` ``) instead of single or double quotes. They provide two major advantages:
- **String Interpolation:** You can embed JavaScript expressions inside `${}`.
- **Multi-line Strings:** You can create strings that span multiple lines without using escape characters like `\n`.

```javascript
const user = "Alice";
const message = `Welcome back, ${user}!
You have 5 new notifications.`;
```

## Character Access
There are two primary ways to access characters within a string:
- **Bracket Notation:** `str[index]` returns the character at the specified index or `undefined` if the index is out of bounds.
- **charAt():** `str.charAt(index)` returns the character or an empty string `""` if the index is out of bounds.


## String Comparison
Strings are compared based on **lexicographical order** (dictionary order) using Unicode values. Note that JavaScript is case-sensitive when comparing strings.

```javascript
console.log("apple" < "banana"); // true
console.log("Z" < "a");          // true (Uppercase letters have lower Unicode values)
```

## The `length` Property
The `.length` property returns the number of UTF-16 code units in the string. 

```javascript
const str = "JavaScript";
console.log(str.length); // 10

const arabicStr = "مرحبا";
console.log(arabicStr.length); // 5
```

## Escape Sequences
To include special characters in a string that would otherwise be interpreted as code, use the backslash (`\`) escape character:
- `\'`: Single quote
- `\"`: Double quote
- `\\`: Backslash
- `\n`: Newline
- `\t`: Tab


## Excercise

````masteryls
{"id":"afadc858-7b3b-4623-aabe-95b3ef2f242b", "title":"String Immutability and Method Behavior", "type":"multiple-choice"}
Consider the following JavaScript code snippet:

```js
let school = "university";
school[0] = "U";
school.toUpperCase();
let result = school.substring(0, 4);
```

What is the value of the variable `result` after this code executes?

- [ ] "Univ"
- [ ] "UNIV"
- [x] "univ"
- [ ] "Univer"
````
