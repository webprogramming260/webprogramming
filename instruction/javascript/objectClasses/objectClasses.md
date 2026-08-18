# JavaScript object and classes

📖 **Deeper dive reading**: [MDN Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)

A JavaScript object represents a collection of name value pairs referred to as properties. The property name must be of type String or Symbol, but the value can be of any type. Objects also have common object-oriented functionality such as constructors, a `this` pointer, static properties and functions, and inheritance.

Objects can be created with the new operator. This causes the object's constructor to be called. Once declared you can add properties to the object by simply referencing the property name in an assignment. Any type of variable can be assigned to a property. This includes a sub-object, array, or function. The properties of an object can be referenced either with dot (`obj.prop`) or bracket notation (`obj['prop']`).

```js
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```

The ability to dynamically modify an object is incredibly useful when manipulating data with an indeterminate structure.

> [!NOTE]
>
> There are different meanings of the term `object` in JavaScript. Object can refer to the standard JavaScript objects (e.g. `Promise, Map, Object, Function, Date, ...`), or it can refer specifically to the JavaScript `Object` object (i.e. `new Object()`), or it can refer to any JavaScript object you create (e.g. `{a:'a', b:2}` ). This overloaded usage can be a bit confusing.

## Object-literals

You can also declare a variable of object type with the `object-literal` syntax. This syntax allows you to provide the initial composition of the object.

```js
const obj = {
  a: 3,
  b: 'fish',
  c: [1, true, 'dog'],
  d: { e: false },
  f: function () {
    return 'hello';
  },
};
```


## Object functions

Object has several interesting static functions associated with it. Here are some of the commonly used ones.

| Function | Meaning                             |
| -------- | ----------------------------------- |
| entries  | Returns an array of key value pairs |
| keys     | Returns an array of keys            |
| values   | Returns an array of values          |

```js
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```

## Constructor

Any function that returns an object is considered a `constructor` and can be invoked with the `new` operator.

```js
function Person(name) {
  return {
    name: name,
  };
}

const p = new Person('Eich');
console.log(p);
// OUTPUT: {name: 'Eich'}
```

Because objects can have any type of property value you can create methods on the object as part of its encapsulation.

```js
function Person(name) {
  return {
    name: name,
    log: function () {
      console.log('My name is ' + this.name);
    },
  };
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

## This pointer

Notice in the last example the use of the keyword `this` when we referred to the name property (`this.name`). The meaning of `this` depends upon the scope of where it is used, but in the context of an object it refers to a pointer to the object. We will talk more about the `this` pointer in the instruction on scope.

## Classes

You can use classes to define objects. Using a class clarifies the intent to create a reusable component rather than a one-off object. Class declarations look similar to declaring an object, but classes have an explicit constructor and assumed function declarations. The person object from above would look like the following when converted to a class.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

You can make properties and functions of classes private by prefixing them with a `#`.

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}

const p = new Person('Eich');
p.#name = 'Lie';
// OUTPUT: Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```

## Inheritance

Classes can be extended by using the `extends` keyword to define inheritance. Parameters that need to be passed to the parent class are delivered using the `super` function. Any functions defined on the child that have the same name as the parent override the parent's implementation. A parent's function can be explicitly accessed using the `super` keyword.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    return 'My name is ' + this.name;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUTPUT: My name is Eich. I am a programmer
```

## Dynamic Object Manipulation

In many modern programming languages, particularly dynamic ones like JavaScript and Python, objects are not rigid structures fixed at the moment of instantiation. While a class defines the initial blueprint, the resulting objects can often be manipulated dynamically during runtime. This means you can add new properties, modify existing methods, or even delete members entirely based on the application's state or user input.

This flexibility allows developers to use objects as flexible data containers. For instance, in JavaScript, you can assign a value to a property that wasn't previously defined in the class, and the engine will automatically attach it to that specific instance. This is often referred to as "monkey patching" or "dynamic property assignment."

### Key Concepts in Dynamic Manipulation

*   **Property Addition:** Attaching new data fields to an instance after it has been created.
*   **Property Deletion:** Removing a field or method from an instance to save memory or change behavior.
*   **Method Overriding:** Replacing a specific instance's function without affecting other instances of the same class.

The following code example demonstrates how a standard object can be modified on the fly in JavaScript:

```javascript
class Hero {
  constructor(name) {
    this.name = name;
  }
}

const paladin = new Hero("Arthur");

// 1. Dynamically adding a property
paladin.level = 10; 

// 2. Dynamically adding a method
paladin.greet = function() {
  console.log(`Greetings, I am ${this.name}, Level ${this.level}`);
};

paladin.greet(); // Output: Greetings, I am Arthur, Level 10

// 3. Deleting a property
delete paladin.level;
console.log(paladin.level); // Output: undefined
```

While dynamic manipulation offers immense power, it should be used with caution. Over-reliance on dynamic properties can lead to "hidden classes" issues in engine optimization and can make code harder to debug, as the object's shape is no longer guaranteed by its class definition.

```masteryls
{"id":"dyn-obj-001", "title":"Dynamic Property Assignment", "type":"multiple-choice"}
What happens in a dynamic language like JavaScript when you assign a value to a property that was not defined in the class constructor?

- [ ] The program throws a "PropertyNotDefined" runtime error.
- [ ] The value is ignored and the object remains unchanged.
- [x] The engine creates the property on that specific instance and assigns the value.
- [ ] The property is added to the Class blueprint, affecting all existing and future instances.
```


