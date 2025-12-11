'use strict';
// unknownVarName = 3;      - Must declare variables
// var undefined = 3;       - Keywords can't be variables
// function bad(a, a, b) {} - Duplicate parameters
// 'x'.name = 'rat';        - Can't add properties to primitives

// ---------- start -------------
function start(fn) {
  console.log(`%c JavaScript Demo`, 'font-size:2em; color: red;');

  fn = fn || variables;
  while (fn) {
    console.clear();
    console.log('%c %s', 'font-size:1.5em; color:red;', fn.name);
    fn = fn();
  }
  console.clear();
  console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
  debugger;
}

// ---------- variables -------------
let g = 1000;
function variables() {
  debugger;

  var x = 1; // deprecated
  let y = 1;
  const z = 'tacos';

  return types;
}

// ---------- types -------------
function types() {
  debugger;

  // Dynamic typing allows for reassignment

  // null
  let x = null;
  console.log('type changed: ', typeof x, x);

  // undefined
  x = undefined;
  console.log('type changed: ', typeof x, x);

  // string
  x = 'fish';
  console.log('type changed: ', typeof x, x);

  // number
  x = 1;
  console.log('type changed: ', typeof x, x);

  // object
  x = {};
  console.log('type changed: ', typeof x, x);
  x = { v: 2, z: 'fish' };
  console.log('type changed: ', typeof x, x);

  // array
  x = [1, 2];
  console.log('type changed: ', typeof x, x);
  console.log(Array.isArray(x));
  console.log(x instanceof Array);

  // date
  x = new Date();
  console.log('type changed: ', typeof x, x);
  console.log(x instanceof Date);

  // function
  x = function () {
    return 3;
  };
  console.log('type changed: ', typeof x, x);

  // Dynamic conversions
  console.log('rat' + [' fink']);
  console.log(1 + 'rat');
  console.log('rat' + 1);
  console.log(1 * 'rat');
  console.log([2] + [3]);
  console.log(true + null);
  console.log(true + undefined);

  return equality;
}

// ---------- equality -------------
function equality() {
  debugger;

  // Always use strict equality ===

  console.log(0 === 0);
  console.log(false === false);
  console.log('taco' === 'taco');
  console.log(undefined === undefined);

  console.log(0 === false);
  console.log('' === false);
  console.log('' === 0);
  console.log('0' === 0);
  console.log('17' === 17);
  console.log([1, 2] === '1,2');
  console.log([1, 2] === [1, 2]); // Objects compared by reference
  console.log(null === undefined);

  return conditionals;
}

// ---------- conditionals -------------
function conditionals() {
  debugger;

  // falsy (false, 0, -0, '', NaN, null, undefined)
  // truthy = !falsy

  if (true) {
    console.log('true');
  }

  if ((!false && undefined) || (true && !0)) {
    console.log('true');
  }

  if (false) {
    console.log('if');
  } else if (false) {
    console.log('else if');
  } else {
    console.log('else');
  }

  for (let i = 1; i < 3; i++) {
    console.log(`for ${i}`);
  }

  while (true) {
    console.log('while');
    break;
  }

  const pet = 'fish';
  switch (pet) {
    case 'fish':
      console.log('fish');
      break; // What happens if you remove this?
    case 'dog':
      console.log('dog');
      break;
    default:
      console.log('no pet. Buy one: statements("dog")');
  }

  return functions;
}

// ---------- functions -------------
function functions() {
  debugger;

  // inner function
  function f() {
    return 1;
  }
  console.log(f());

  // anonymous function with parameters and return value
  f = function (i) {
    return i;
  };
  console.log(f(3));

  // no return value
  f = function (i) {
    i;
  };
  console.log(f(5));

  // optional parameters
  f = function (a, b, c = 'rat') {
    return [a, b, c];
  };
  console.log(f(1));

  return arrowFunctions;
}

// single line with implicit return, inherits this binding
function arrowFunctions() {
  debugger;

  const arrow = () => 1;

  const arrowWithBlock = (a) => {
    a;
  };

  const arrowWithReturn = (a) => {
    return a;
  };

  console.log(arrow(), arrowWithBlock(2), arrowWithReturn(3));

  return closures;
}

// ---------- closures -------------
function closures() {
  debugger;

  // A function and its surrounding state.

  function dup(dupLimit, sep = ':') {
    return (t) => {
      let dupCount = 1;
      let out = t;
      while (dupCount++ < dupLimit) {
        out += sep + t;
      }
      return out;
    };
  }

  const duplicate4 = dup(4);
  console.log(duplicate4('hello'));

  console.log(dup(3)('again'));

  return strings;
}

// ---------- strings -------------
function strings() {
  debugger;

  let s = 'Cats Dogs Rats Mice'; // string literal
  s = new String('Cats Dogs Rats Mice'); // string object

  console.log('casefold: ', s.toUpperCase(), s.toLowerCase());
  console.log('split: ', s.split(' '));
  console.log('endsWith: ', s.endsWith('Mice'));
  console.log('replace: ', s.replace('Dogs', 'Puppies'));
  console.log('slice: ', s.slice(3, 7));

  return regex;
}

// ---------- regex -------------
function regex() {
  debugger;

  const text = 'Both cats and dogs are pets, but not rocks.';

  const objRegex = new RegExp('cat.?', 'i'); // cat, cats, catz
  const literalRegex = /cat.?/i;
  console.log(text.match(literalRegex));

  // literal regex with flags
  const petRegex = /(dog)|(cat)|(bird)/gim; // global, case insensitive, multiline

  console.log(text.match(petRegex));
  console.log(text.replace(petRegex, 'animal'));
  console.log(petRegex.test(text));

  return arrays;
}

// ---------- arrays -------------
function arrays() {
  debugger;

  let numbers = [];
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }
  console.log('push 10: ', numbers);
  console.log('pop: ', numbers.pop());

  console.log('numbers[1]:', numbers[1]);
  console.log('slice:', numbers.slice(2, 5));
  console.log('length:', numbers.length);

  for (let entry of numbers) {
    console.log(entry);
    if (entry == 3) break;
  }

  return arrayOperations;
}

// ---------- arrayOperations -------------
function arrayOperations() {
  debugger;

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(
    'map',
    numbers.map((n) => n * 100)
  );
  console.log(
    'reduce',
    numbers.reduce((a, c) => a + c)
  );
  console.log(
    'forEach',
    numbers.forEach((n) => console.log(n % 2))
  );
  console.log(
    'filter',
    numbers.filter((n) => n % 2)
  );
  console.log(
    'some',
    numbers.some((n) => n > 5)
  );

  return exceptions;
}

// ---------- exceptions -------------
function exceptions() {
  debugger;

  try {
    (() => {
      throw 'trouble in river city';
    })();
  } catch (error) {
    console.log('error: ' + error);
  } finally {
    console.log('finally!');
  }

  return templateLiterals;
}

// ---------- templateLiterals -------------
function templateLiterals() {
  debugger;

  let name = 'amigo';
  let hello = (n) => 'hola ' + n;

  console.log(`Template ${'lite' + 'rals'}! ${hello(name)}`);

  return specialOperators;
}

// ---------- specialOperators -------------
function specialOperators() {
  debugger;

  // Logical OR
  // Uses right if left is falsy
  // falsy: (false, 0, -0, '', NaN, null, undefined)
  let x = null || 5;
  console.log('logical or: ', x);
  x = x || 10;
  console.log('logical or: ', x);
  console.log(undefined || null || 0 || NaN || 'logical OR');

  // Nullish coalescing operator
  // Uses right if left is nullish
  // Nullish: Null or undefined
  console.log(undefined ?? null ?? 'coalescing');
  console.log(0 ?? 'coalescing');

  // Short circuit with nullish coalescing
  let z;
  z ?? (z = x);
  console.log('short circuit: ', z);

  // Logical nullish assignment for short circuit
  // Assign if left is nullish
  let y;
  y ??= 30;
  console.log('logical nullish :', y);
  y ??= 40;
  console.log('logical nullish :', y);

  return objects;
}

// ---------- objects -------------
function objects() {
  debugger;

  let obj = {
    animal: 'fish',
  };

  obj.count = 3;
  obj.location = {
    cities: ['utah', 'new york'],
    origin: 'ocean',
  };
  obj.print = function () {
    return `${this.animal} live in ${this.location.cities.join(' and ')}`;
  };

  console.log(obj);
  console.log(obj.animal);
  console.log(obj.print());

  // iterator of properties
  for (const property in obj) {
    console.log(`name:${property}, value:${obj[property]}`);
  }

  for (const value of Object.keys(obj)) {
    console.log(`value:${value}`);
  }

  return spread;
}

// ---------- spread -------------
function spread() {
  debugger;

  // spread
  let input = [1, 2, 3];
  input = [...input, 4, 5, 6];
  console.log(input);

  let base = { a: 'rat', b: 'cat' };
  console.log({ c: 'dog', ...base, d: 'bird' });

  // rest (variadic)
  const sumAndMultiply = (multiplier, ...numbers) => {
    console.log(numbers);
    return numbers.reduce((a, n) => a + multiplier * n);
  };

  console.log(sumAndMultiply(10, ...input, 7, 8));

  return objectArrayOperations;
}

// ---------- objectArrayOperations -------------
function objectArrayOperations() {
  debugger;

  let beaches = [
    { name: 'Sunset', shore: 'north' },
    { name: 'Kailua', shore: 'east' },
    { name: 'Makua', shore: 'west' },
    { name: 'Lanikai', shore: 'east' },
    { name: 'Hukilau', shore: 'east' },
  ];
  console.table(beaches);

  // iterator of objects
  for (const beach of beaches) {
    if (beach.shore == 'west') break;
    console.log(beach);
  }

  // map the island name to each object
  console.table(beaches.map((n) => ({ ...n, island: 'Oahu' })));

  // reduce down to counts for each shore
  console.table(
    beaches.reduce(
      (totals, p) => ({ ...totals, [p.shore]: (totals[p.shore] || 0) + 1 }),
      {}
    )
  );

  // Filter to the east shore
  console.table(beaches.filter((n) => n.shore == 'east'));

  // Sort by name
  console.table(beaches.sort((a, b) => (a.name > b.name ? 1 : -1)));

  return optionalChain;
}

// ---------- optionalChain -------------
function optionalChain() {
  debugger;

  const x = {
    y: () => 3,
  };

  console.log(x.y?.());
  console.log(x.r?.());
  try {
    console.log(x.r());
  } catch (error) {
    console.log(error.message);
  }

  const fallback = () => 'fallback called';
  console.log(x.r?.() || fallback());

  return iteratorsAndGenerators;
}

// ---------- iteratorsAndGenerators -------------
function iteratorsAndGenerators() {
  debugger;

  // generator
  function* numberMaker(start, end) {
    for (let i = start; i < end; i++) {
      yield { number: i };
    }
  }

  // iterator
  for (let num of numberMaker(3, 6)) {
    console.log(num);
  }

  return destructuringArrays;
}

// ---------- destructuringArrays -------------
function destructuringArrays() {
  debugger;

  let x, y, z;

  const a = [1, 2];
  x = a;
  console.log(x);

  [x] = a;
  console.log(x);

  [x, y] = a;
  console.log(x, y);

  [x, y, z] = a;
  console.log(x, y, z);

  [x, y, z = 100] = a;
  console.log(x, y, z);

  [x, , y, ...z] = [1, 2, 3, 4, 5, 6, 7];
  console.log(x, y, z);

  return destructuringParameters;
}

// ---------- destructuringParameters -------------
function destructuringParameters() {
  debugger;

  // Destructured array param
  function af([a = 3, b = 'taco'] = []) {
    console.log(a, b);
  }
  af();
  af([20]);

  // Destructured object param
  function of({ a = 3, b = { animal: 'rat' } } = {}) {
    console.log(`a: ${a} b: ${b.animal}`);
  }
  of({ a: 10 });
  of({ b: { animal: 'dog' } });

  return destructuringReturns;
}

// ---------- destructuringReturns -------------
function destructuringReturns() {
  debugger;

  function af({ a = 3, b = 'rat' } = {}) {
    return [a, b, 'cat'];
  }

  const [x, y, z] = af({ a: 10 });
  console.log('array return: ', x, y, z);

  function of({ a = 3, b = 'rat' } = {}) {
    return { a, b, animal: 'animal-' + b };
  }

  const { a, animal, ...rest } = of({ a: 10 });
  console.log('object return: ', a, animal, rest);

  return math;
}

// ---------- math -------------
function math() {
  debugger;

  console.log('max: ', Math.max(3, Math.PI));
  console.log('random: ', Math.random());
  console.log('floor: ', Math.floor(3.999));

  return json;
}

// ---------- json -------------
function json() {
  debugger;

  const obj = {
    name: 'tina',
    alive: true,
    print: () => `${this.name} is ${this.alive}`,
  };

  console.log('object: ', obj);

  const objText = JSON.stringify(obj);
  console.log('json: ', objText);
  console.log('rehydrate: ', JSON.parse(objText));

  return classes;
}

// ---------- classes -------------
function classes() {
  debugger;

  // base class
  class Location {
    static defaultPlace = 'east';

    constructor(location) {
      this.location = location || Location.defaultPlace;
    }
  }

  // derived class
  class Beach extends Location {
    constructor(name, location, weather = 'sunny') {
      super(location);
      this.name = name;
      this._weather = weather;
    }

    get weather() {
      return this._weather;
    }

    set weather(weather) {
      this._weather = weather;
    }
  }

  const sunsetBeach = new Beach('Sunset', 'north', 'rainy');
  sunsetBeach.weather = 'snowing';
  const beaches = [sunsetBeach, new Beach('Kailua')];

  for (let beach of beaches) {
    console.log(
      `${beach.weather} weather at ${beach.name} beach on the ${beach.location} shore`
    );
  }

  return compatibility;
}

// ---------- compatibility  -------------
function compatibility() {
  debugger;

  // loose equality, does type conversion and unobvious equality rules
  1 == '1'; // true
  [1, 2] == '1,2'; // true
  null == undefined; // true

  // strict equality compares values without conversion
  1 === '1'; // false
  null === undefined; // false

  // all true for loose, all false for strict
  0 == false;
  '' == false;
  '' == 0;
  '0' == 0;
  '17' == 17;
  [1, 2] == '1,2';
  null == undefined;

  // Always use strict. truthy and falsy
  null === undefined; // false
  null !== undefined; // true

  // Var, let, const
  var x = 1; // deprecated
  let y = 1;
  const z = 'tacos';

  console.log(g, x, y, z);

  // This is why 'var' is deprecated
  {
    var x = 2; // same variable!
    var g = 2;
    console.log(x, g); // 2, 2
  }
  console.log(x, g); // 2, 2

  {
    let y = 2; // different variable
    console.log(y); // 2
  }
  console.log(y); // 1

  return undefined;
}

// ---------- document -------------
function wo(msg) {
  // Interact with the DOM
  const output = document.querySelector('button');
  output.innerText = msg;
}
