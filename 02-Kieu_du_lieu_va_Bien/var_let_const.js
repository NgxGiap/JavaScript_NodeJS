// 1. Vấn đề về scope của var
function run() {
    if (true) {
        var a = 1; // a có function scope
        let b = 2; // b có block scope
        const c = 3; // c có block scope
    }
    console.log(a); // 1 (Có thể truy cập a ở ngoài block if)
    // console.log(b); // ReferenceError: b is not defined (Không thể truy cập)
    // console.log(c); // ReferenceError: c is not defined (Không thể truy cập)
}
run();

// 2. Vấn đề về hoisting của var
console.log(x); // undefined (x được hoisted và gán undefined)
var x = 5;

// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// 3. Vấn đề về gán lại của const
const myObject = { id: 1 };
// myObject = { id: 2 }; // TypeError: Assignment to constant variable.

// Tuy nhiên, bạn CÓ THỂ thay đổi thuộc tính của đối tượng được gán bằng const
myObject.id = 2; // Điều này hợp lệ!
console.log(myObject); // { id: 2 }