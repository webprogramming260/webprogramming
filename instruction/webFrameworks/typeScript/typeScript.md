# TypeScript

📖 **Deeper dive reading**: [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

TypeScript adds static type checking to JavaScript. This provides type checking while you are writing the code to prevent mistakes like using a string when a number is expected. Consider the following simplistic JavaScript code example.

```js
function increment(value) {
  return value + 1;
}

let count = 'one';
console.log(increment(count));
```

When this code executes the console will log `one1` because the count variable was accidentally initialized with a string instead of a number.

## Possible types

The following table defines the most common types. If you don't explicitly provide a type then it defaults to `any`. This means that it can represent any possible type. Usually you want to avoid using `any` because it defeats one of the main reasons for using TypeScript.

| Type        | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| `string`    | Represents textual data.                                                  |
| `number`    | Represents numeric values, including integers and floating-point numbers. |
| `boolean`   | Represents `true` or `false`.                                             |
| `bigint`    | Represents large integers beyond the `number` type limit.                 |
| `null`      | Represents an explicitly empty value.                                     |
| `undefined` | Represents a variable that has been declared but not assigned a value.    |
| `any`       | A dynamic type that disables type checking.                               |

## Using types

With TypeScript you explicitly define the types, and as the JavaScript is transpiled (with something like Babel) an error will be generate long before the code is seen by a user. To provide type safety for our increment function, it would look like this:

```ts
function increment(value: number): number {
  return value + 1;
}

let count: number = 'one';
console.log(increment(count));
```

With TypeScript enabled, VS Code will analyze the code and give you an error about the invalid type conversion.

![TypeScript bad assignment](typescriptBadAssignment.jpg)

In addition to defining types for function parameters, you can define the types of object. For example, when defining a _Bid_ class, you can define object types with the `type` keyword, or by implicitly creating an object property.

```ts
type Product = {
  imageUrl: string;
  name: string;
};

export class Bid {
  product: Product;
  state: {
    quote: string;
    price: number;
  };

  constructor(product: Product) {
    this.product = product;
    this.state = {
      quote: 'loading...',
      price: 0,
    };
  }
}
```

You can likewise specify the type of a React function style component's properties with an inline object definition.

```ts
function Clicker(props: { initialCount: number }) {
  const [count, updateCount] = React.useState(props.initialCount);

  return <div onClick={() => updateCount(1 + count)}>Click count: {count}</div>;
}
```

## Interfaces

Because it is so common to define object property types, TypeScript introduced the use of the `interface` keyword to define a collection of parameters and types that an object must contain in order to satisfy the interface type. For example, a Book interface might look like the following.

```ts
interface Book {
  title: string;
  id: number;
}
```

You can then create an object and pass it to a function that requires the interface.

```ts
function catalog(book: Book) {
  console.log(`Cataloging ${book.title} with ID ${book.id}`);
}

const myBook = { title: 'Essentials', id: 2938 };
catalog(myBook);
```

## Beyond type checking

TypeScript also provides other benefits, such as warning you of potential uses of an uninitialized variable. Here is an example of when a function may return null, but the code fails to check for this case.

![TypeScript uninitialized](typescriptUninitialized.jpg)

You can correct this problem with a simple `if` block.

```ts
const containerEl = document.querySelector<HTMLElement>('#picture');
if (containerEl) {
  const width = containerEl.offsetWidth;
}
```

Notice that in the above example, the return type is coerced for the `querySelector` call. This is required because the assumed return type for that function is the base class `Element`, but we know that our query will return the subclass `HTMLElement` and so we need to cast that to the subclass with the `querySelector<HTMLElement>()` syntax.

### Unions

TypeScript introduces the ability to define the possible values for a new type. This is useful for doing things like defining an enumerable or possible types.

With plain JavaScript you might create an enumerable with a class.

```js
export class AuthState {
  static Unknown = new AuthState('unknown');
  static Authenticated = new AuthState('authenticated');
  static Unauthenticated = new AuthState('unauthenticated');

  constructor(name) {
    this.name = name;
  }
}
```

With TypeScript you can define this by declaring a new type and defining what its possible values are.

```ts
type AuthState = 'unknown' | 'authenticated' | 'unauthenticated';

let auth: AuthState = 'authenticated';
```

You can also use unions to specify all of the possible types that a variable can represent.

```ts
function square(n: number | string) {
  if (typeof n === 'string') {
    console.log(`{$n}^2`);
  } else {
    console.log(n * n);
  }
}
```

### Enum

TypeScript also supports enumerations. This adds the benefit of using symbols instead of strings for values.

```ts
enum AuthState {
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

let auth: AuthState = AuthState.Authenticated;
```

## Using TypeScript

### Experimenting

If you would like to experiment with TypeScript you can easily use [CodePen](https://codepen.io), or the official [TypeScript playground](https://www.typescriptlang.org/play). The TypeScript playground has the advantage of showing you inline errors and what the resulting JavaScript will be.

![typescript playground](typescriptPlayground.jpg)

### TypeScript with Vite

Vite automatically supports the use of TypeScript. That means you can simply write your components with TypeScript.

#### app.tsx

```tsx
import React, { JSX } from 'react';
import ReactDOM from 'react-dom/client';

interface Props {
  greeting: string;
  count?: number;
}

function App({ greeting, count = 3 }: Props): JSX.Element {
  return (
    <div>
      {Array.from({ length: count }).map((_, index: number) => (
        <h1 key={index}>{greeting}, World!</h1>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App greeting='hello' />);
```

### TypeScript with Node.js

Node LTS version 22 introduced experimental use of TypeScript with the expectation of it being enabled by default in future versions.

index.ts

```ts
function add(a: number, b: number | string): number {
  if (typeof b === 'string') {
    b = parseInt(b, 10);
  }
  return a + b;
}

const x: number = 3;
const result: number = add(x, '3');

console.log(result);
```

The following will run the above code with Node.js.

```sh
node --experimental-transform-types index.ts

6
```

### Installing type bundles

Some NPM packages put their type information in different packages. For example, to install the Node and React types you would execute the following.

```sh
npm install -D @types/node
npm install -D @types/react
```

### Typescript with an existing application

If you want to convert an existing application, then install the NPM `typescript` package to your development dependencies.

```sh
npm install -D typescript
```

This will only include typescript package when you are developing and will not distribute it with a production bundle.
