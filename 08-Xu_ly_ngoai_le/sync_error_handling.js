function calculateDivision(a, b) {
    console.log("Bắt đầu thực hiện phép chia...");
    try {
        const result = divide(a, b); // Gọi hàm có thể throw lỗi
        console.log(`Kết quả là: ${result}`);
    } catch (error) {
        // Bắt lỗi được ném ra từ hàm divide()
        console.error("Đã xảy ra lỗi:", error.message);
    } finally {
        // Khối này luôn chạy
        console.log("Kết thúc việc tính toán.");
    }
}

calculateDivision(10, 2); // Chạy thành công
console.log("---");
calculateDivision(10, 0); // Gây ra lỗi và được bắt lại