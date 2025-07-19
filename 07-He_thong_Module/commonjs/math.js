// math.js (CommonJS module)

// Cách 1: Thêm thuộc tính vào exports
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// Cách 2: Gán trực tiếp cho module.exports (thường dùng khi muốn export một giá trị duy nhất)
// module.exports = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b
// };