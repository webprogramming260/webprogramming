function add(a: number, b: number | string): number {
  if (typeof b === 'string') {
    b = parseInt(b, 10);
  }
  return a + b;
}

const x: number = 3;
const result: number = add(x, '3');

console.log(result);
