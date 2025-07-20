function divide(a, b) {
    if (b === 0) {
        // Ném một ngoại lệ (Error object là tốt nhất)
        throw new Error("Lỗi: Không thể chia cho số 0.");
    }
    return a / b;
}

try {
    console.log("Bắt đầu khối try...");

    // Ví dụ 1: Không có lỗi
    let result1 = divide(10, 2);
    console.log("Kết quả 1:", result1); // Output: Kết quả 1: 5

    // Ví dụ 2: Có lỗi
    let result2 = divide(10, 0); // Dòng này sẽ ném lỗi
    console.log("Kết quả 2:", result2); // Dòng này sẽ không được thực thi

} catch (error) {
    // Khối catch được thực thi khi có lỗi
    console.error("Đã bắt được lỗi:", error.message); // Output: Đã bắt được lỗi: Lỗi: Không thể chia cho số 0.
    // console.error("Stack trace:", error.stack); // Có thể in ra stack trace để debug
} finally {
    // Khối finally luôn được thực thi
    console.log("Khối finally luôn chạy, dù có lỗi hay không.");
}

console.log("Tiếp tục thực thi sau khối try/catch.");

// Ví dụ về việc ném lỗi không phải Error object (không khuyến khích)
try {
    throw "Đây là một chuỗi lỗi!";
} catch (err) {
    console.log("Bắt được lỗi chuỗi:", err);
}