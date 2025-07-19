// app.js (CommonJS module)
const math = require('./math'); // Nhập toàn bộ đối tượng exports
const { add, subtract } = require('./math'); // Nhập cụ thể các hàm bằng destructuring

console.log('CommonJS Examples:');
console.log(`2 + 3 = ${math.add(2, 3)}`);       // Output: 2 + 3 = 5
console.log(`10 - 4 = ${subtract(10, 4)}`); // Output: 10 - 4 = 6

// Ví dụ về cách module được thực thi một lần duy nhất
const anotherMath = require('./math'); // Sẽ không thực thi lại math.js
console.log('Calling math again via anotherMath:', anotherMath.add(5, 5));