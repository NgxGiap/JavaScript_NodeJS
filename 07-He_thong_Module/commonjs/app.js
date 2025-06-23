// Nhập đối tượng từ math.js
// './' cho biết đây là một module cục bộ trong cùng thư mục
const math = require('./math.js');

const sum = math.add(5, 3);
const difference = math.subtract(5, 3);

console.log(`Tổng là: ${sum}`);         // Tổng là: 8
console.log(`Hiệu là: ${difference}`); // Hiệu là: 2