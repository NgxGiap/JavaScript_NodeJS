// Bạn có thể gọi hàm ở đây dù nó được định nghĩa ở dưới
console.log(add(5, 3)); // Kết quả: 8

// Định nghĩa hàm
function add(a, b) {
    return a + b;
}

console.log("============================");

// multiply(4, 5); // Gây ra lỗi: ReferenceError (nếu dùng let/const) hoặc TypeError (nếu dùng var)

const multiply = function(a, b) {
    return a * b;
};

// Phải gọi sau khi đã định nghĩa
console.log(multiply(4, 5)); // Kết quả: 20