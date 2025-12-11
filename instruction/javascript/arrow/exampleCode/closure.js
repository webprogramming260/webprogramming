function makeClosure(init) {
  let closureValue = init;
  return () => {
    return `closure ${++closureValue}`;
  };
}

const closure = makeClosure(0);

console.log(closure());
// OUTPUT: closure 1

console.log(closure());
// OUTPUT: closure 2
