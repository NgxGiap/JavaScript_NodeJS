// Hàm mô phỏng một tác vụ bất đồng bộ (ví dụ: tải dữ liệu)
function fetchData(callback) {
    console.log("Đang tải dữ liệu...");
    setTimeout(() => {
        const data = "Dữ liệu đã được tải xong!";
        callback(data); // Gọi lại hàm callback khi tác vụ hoàn tất
    }, 2000);
}

// Hàm callback
function processData(data) {
    console.log("Xử lý dữ liệu:", data);
}

// Gọi hàm fetchData và truyền processData làm callback
fetchData(processData);
console.log("Tiếp tục thực thi các tác vụ khác..."); // Dòng này sẽ chạy ngay lập tức