# JSON

📖 **Deeper dive reading**:

- [MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [Douglas Crockford: The JSON Saga](https://www.youtube.com/watch?v=-C-JoyNuQJs)

JavaScript Object Notation (JSON) was conceived by Douglas Crockford in 2001 while working at Yahoo! JSON, pronounced like the name Jason, received official standardization in 2013 and 2017 (ECMA-404, [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)).

JSON provides a simple, and yet effective way, to share and store data. By design JSON is easily convertible to, and from, JavaScript objects. This makes it a very convenient data format when working with web technologies. Because of its simplicity, standardization, and compatibility with JavaScript, JSON has become one of the world's most popular data formats.

## Format

A JSON document contains one of the following data types:

| Type    | Example                 |
| ------- | ----------------------- |
| string  | "crockford"             |
| number  | 42                      |
| boolean | true                    |
| array   | [null,42,"crockford"]   |
| object  | {"a":1,"b":"crockford"} |
| null    | null                    |

Most commonly, a JSON document contains an object. Objects contain zero or more key value pairs. The key is always a string, and the value must be one of the valid JSON data types. Key value pairs are delimited with commas. Curly braces delimit an object, square brackets and commas delimit arrays, and strings are always delimited with double quotes.

Here is an example of a JSON document.

```json
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
```

JSON is always encoded with [UTF-8](https://en.wikipedia.org/wiki/UTF-8). This allows for the representation of global data.

## Converting to JavaScript

You can convert JSON to, and from, JavaScript using the `JSON.parse` and `JSON.stringify` functions.

```js
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```

Note that in this example, JSON cannot represent the JavaScript `undefined` object and so it gets dropped when converting from JavaScript to JSON.


## JSON vs. JavaScript Objects
It is a common misconception that JSON is the same as a JavaScript object literal. While JSON syntax is derived from JavaScript, there are critical differences:

| Feature | JSON | JavaScript Object |
| :--- | :--- | :--- |
| **Quotes** | Double quotes `"` are mandatory for keys and string values. | Keys can be unquoted; single quotes `'` are allowed. |
| **Trailing Commas** | Strictly forbidden after the last element. | Allowed and often encouraged for version control diffs. |
| **Methods/Functions** | Not allowed. | Can contain functions (methods). |
| **Data Types** | Limited to: String, Number, Object, Array, Boolean, Null. | Can include `undefined`, `Date`, `Map`, `Set`, `Symbol`, etc. |

## Handling Dates
JSON does not have a native "Date" data type. To exchange date information, the industry standard is to use **ISO 8601** formatted strings.

```json
{
  "timestamp": "2023-10-27T10:30:00Z"
}
```

## Syntax Constraints and Common Pitfalls
To ensure a JSON file is valid, the following rules must be strictly followed:
*   **No Comments:** The JSON specification (RFC 8259) does not support `//` or `/* */` comments.
*   **Numeric Leading Zeros:** Numbers cannot have leading zeros (e.g., `05` is invalid, but `0.5` is valid).
*   **Escape Characters:** Special characters in strings must be escaped using a backslash (e.g., `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`).

## JSON Schema
For production environments, it is essential to validate the structure of JSON data. **JSON Schema** is a vocabulary that allows you to annotate and validate JSON documents. It defines:
*   Required properties.
*   Data types for each key.
*   Value constraints (e.g., minimum/maximum numbers, regex patterns for strings).

**Example Schema:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "username": { "type": "string", "minLength": 3 }
  },
  "required": ["id", "username"]
}
```

## Best Practices for JSON usage
1.  **Use CamelCase or snake_case consistently:** Choose one naming convention for keys and stick to it throughout the project.
2.  **Keep it Flat:** Avoid deeply nested objects where possible to reduce complexity in parsing and data access.
3.  **Return Objects, Not Arrays:** At the top level of an API response, return an object (e.g., `{"data": [...]}`) instead of a naked array. This allows for future metadata expansion (like pagination) without breaking the schema.
4.  **Use Null for Empty Values:** Use `null` to explicitly indicate the absence of a value rather than omitting the key or using an empty string.


```masteryls
{"id":"aee3f849-7c00-4c27-bbd6-8727d2e4823c", "title":"Handling Non-JSON Data Types", "type":"multiple-choice"}
When using `JSON.stringify()` to convert a JavaScript object into a JSON string, what happens if the object contains a property with a value of `undefined` or a function?

- [ ] The conversion throws a `TypeError` because `undefined` and functions are not valid JSON data types.
- [ ] The properties are preserved, but their values are converted to `null` to maintain the object's structure.
- [x] The properties are omitted entirely from the resulting JSON string.
- [ ] The values are converted into their string representations (e.g., `"undefined"` or the function's source code).
```


