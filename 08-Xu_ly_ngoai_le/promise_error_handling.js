function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (filename === "error.txt") {
                reject(new Error("Không tìm thấy file (Promise): " + filename));
            } else if (filename === "corrupt.txt") {
                // Mô phỏng lỗi xảy ra trong quá trình xử lý đồng bộ bên trong then
                resolve("Nội dung của " + filename);
            } else {
                resolve("Nội dung của " + filename);
            }
        }, 1000);
    });
}

// Ví dụ thành công
readFilePromise("data.txt")
    .then(data => {
        console.log("Đọc thành công data.txt (Promise):", data);
    })
    .catch(error => {
        console.error("Lỗi khi đọc file data.txt (Promise):", error.message);
    });

// Ví dụ lỗi và chuỗi Promise
readFilePromise("error.txt") // Promise này sẽ bị reject
    .then(data => {
        console.log("Bước 1 thành công (Promise):", data);
        return readFilePromise("another_file.txt");
    })
    .then(data => {
        console.log("Bước 2 thành công (Promise):", data);
    })
    .catch(error => { // .catch này sẽ bắt lỗi từ readFilePromise("error.txt")
        console.error("Đã bắt được lỗi trong chuỗi Promise:", error.message);
    })
    .finally(() => {
        console.log("Tác vụ Promise đã kết thúc.");
    });

// Ví dụ lỗi trong .then()
readFilePromise("corrupt.txt")
    .then(data => {
        console.log("Đọc file corrupt.txt thành công:", data);
        // Giả định một lỗi xảy ra trong quá trình xử lý dữ liệu
        throw new Error("Lỗi xử lý nội dung file!");
    })
    .catch(error => { // .catch này sẽ bắt lỗi "Lỗi xử lý nội dung file!"
        console.error("Lỗi xử lý trong .then():", error.message);
    });