// Ví dụ về 'this' trong hàm thông thường và Arrow Function

// Hàm thông thường: 'this' phụ thuộc vào cách hàm được gọi
const traditionalFunc = {
    name: "Traditional",
    sayHello: function() {
        console.log(`Hello, I am ${this.name}`); // 'this' ở đây là traditionalFunc
        setTimeout(function() {
            console.log(`Inside setTimeout (Traditional): Hello, I am ${this.name}`); // 'this' ở đây là window/global object (trong non-strict mode) hoặc undefined (trong strict mode)
        }, 100);
    }
};
traditionalFunc.sayHello(); // Output: Hello, I am Traditional; Inside setTimeout (Traditional): Hello, I am undefined/window

// Arrow Function: 'this' kế thừa từ ngữ cảnh bao bọc (lexical this)
const arrowFunc = {
    name: "Arrow",
    sayHello: function() {
        console.log(`Hello, I am ${this.name}`); // 'this' ở đây là arrowFunc
        setTimeout(() => {
            console.log(`Inside setTimeout (Arrow): Hello, I am ${this.name}`); // 'this' ở đây vẫn là arrowFunc (kế thừa từ ngữ cảnh bên ngoài)
        }, 100);
    }
};
arrowFunc.sayHello(); // Output: Hello, I am Arrow; Inside setTimeout (Arrow): Hello, I am Arrow

// Arrow Function không có đối tượng arguments
const sum = (...args) => { // Sử dụng rest parameters thay vì arguments
    console.log(args); // Output: [1, 2, 3]
    return args.reduce((acc, val) => acc + val, 0);
};
console.log(sum(1, 2, 3)); // Output: 6

// Hàm thông thường có đối tượng arguments
function sumTraditional() {
    console.log(arguments); // Output: [Arguments] { '0': 4, '1': 5, '2': 6 }
    return Array.from(arguments).reduce((acc, val) => acc + val, 0);
}
console.log(sumTraditional(4, 5, 6)); // Output: 15