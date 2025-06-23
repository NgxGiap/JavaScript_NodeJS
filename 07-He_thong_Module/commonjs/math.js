// Cách 1: Xuất một đối tượng chứa nhiều hàm (phổ biến nhất)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract
};

// Cách 2: Thêm thuộc tính vào exports (hoạt động tương tự Cách 1)
// exports.add = (a, b) => a + b;
// exports.subtract = (a, b) => a - b;

// Cách 3: Xuất một giá trị duy nhất (ví dụ một hàm hoặc class)
// const PI = 3.14;
// module.exports = PI;