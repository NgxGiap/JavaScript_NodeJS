function readFileCallback(filename, callback) {
    // Mô phỏng đọc file bất đồng bộ
    setTimeout(() => {
        if (filename === "error.txt") {
            // Trường hợp lỗi
            callback(new Error("Không tìm thấy file: " + filename), null);
        } else {
            // Trường hợp thành công
            callback(null, "Nội dung của " + filename);
        }
    }, 1000);
}

// Ví dụ thành công
readFileCallback("data.txt", (err, data) => {
    if (err) {
        console.error("Lỗi khi đọc file data.txt:", err.message);
    } else {
        console.log("Đọc thành công data.txt:", data);
    }
});

// Ví dụ lỗi (Callback Hell)
readFileCallback("error.txt", (err1, data1) => {
    if (err1) {
        console.error("Lỗi ở bước 1:", err1.message);
        return;
    }
    console.log("Bước 1 thành công:", data1);

    readFileCallback("another_error.txt", (err2, data2) => { // Giả định lỗi ở đây
        if (err2) {
            console.error("Lỗi ở bước 2:", err2.message);
            return;
        }
        console.log("Bước 2 thành công:", data2);

        // ... và cứ thế lồng sâu hơn
    });
});