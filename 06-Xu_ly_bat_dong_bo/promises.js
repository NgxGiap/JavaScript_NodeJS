// Hàm mô phỏng tải dữ liệu bằng Promise
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        console.log("Đang tải dữ liệu (Promise)...");
        const success = true; // Giả định thành công/thất bại

        setTimeout(() => {
            if (success) {
                const data = "Dữ liệu đã được tải xong (Promise)!";
                resolve(data); // Thành công
            } else {
                const error = "Lỗi khi tải dữ liệu (Promise)!";
                reject(error); // Thất bại
            }
        }, 2000);
    });
}

// Sử dụng Promise
fetchDataPromise()
    .then(data => {
        console.log("Xử lý dữ liệu thành công:", data);
        return "Dữ liệu đã được xử lý!"; // Có thể trả về một Promise mới hoặc giá trị
    })
    .then(processedData => {
        console.log("Bước tiếp theo:", processedData);
    })
    .catch(error => {
        console.error("Đã xảy ra lỗi:", error);
    })
    .finally(() => {
        console.log("Tác vụ tải dữ liệu đã kết thúc.");
    });

console.log("Tiếp tục thực thi các tác vụ khác (Promise)...");