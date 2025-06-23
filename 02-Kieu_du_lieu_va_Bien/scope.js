const globalVar = "Tôi là biến toàn cục";

function showGlobal() {
    console.log(globalVar); // "Tôi là biến toàn cục"
}

if (true) {
    console.log(globalVar); // "Tôi là biến toàn cục"
}
showGlobal();

console.log("============================");

function myFunction() {
    var functionVar = "Tôi ở trong hàm";
    console.log(functionVar); // "Tôi ở trong hàm"
}

myFunction();
// console.log(functionVar); // ReferenceError: functionVar is not defined

console.log("============================");

if (true) {
    let blockLet = "Tôi là biến let trong block";
    const blockConst = "Tôi là biến const trong block";
    console.log(blockLet);   // OK
    console.log(blockConst); // OK
}

// console.log(blockLet);   // ReferenceError
// console.log(blockConst); // ReferenceError