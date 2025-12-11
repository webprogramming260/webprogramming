const args = process.argv.slice(2);
const num = parseInt(args[0], 10);
computeAndDisplay(num);

function computeAndDisplay(num) {
  fib = fibonacci(num);
  display(num, fib);
}

function fibonacci(num) {
  let fib = [0];
  if (num > 0) {
    fib.push(1);
    for (let i = 2; i <= num; i++) {
      const next = fib[fib.length - 1] + fib[fib.length - 2];
      fib.push(next);
    }
  }
  return fib;
}

function display(num, fib) {
  console.log(`${num}: ${fib[fib.length - 1]}`);
  fib.forEach((num, i) => console.log(`${i}: ${num}`));
}
