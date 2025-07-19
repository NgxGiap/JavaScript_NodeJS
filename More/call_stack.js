function multiply() {
  console.log ('multiple được gọi');
}

function square() {
  multiply();
  console.log('square được gọi');
}

function printSquare() {
  square();
  console.log('printSquare kết thúc');
}

printSquare();