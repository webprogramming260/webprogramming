function computeHandler() {
  const inputEl = document.querySelector('#in');
  computeAndDisplay(inputEl.value);
}

function computeAndDisplay(num) {
  fib = fibonacci(num);
  display(num, fib);
}

function fibonacci(num) {
  let fib = [0];
  if (num > 0) {
    fib.push(1);
    for (let i = 2; i <= num; i++) {
      const next = fib[fib.length - 1] + fib[fib.length];
      fib.push(next);
    }
  }
  return fib;
}

function display(num, fib) {
  document.querySelector('#output').innerHTML = `
    <div><b>${num}</b>: ${fib[fib.length - 1]}</div>
    <li class='seq'>${fib.join(`</li><li class='seq'>`)}</li>
  `;
}
