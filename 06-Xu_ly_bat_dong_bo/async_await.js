// Hàm mô phỏng tải dữ liệu bằng Promise (tái sử dụng từ ví dụ trên)
function fetchDataAsync() {
    return new Promise((resolve, reject) => {
        console.log("Đang tải dữ liệu (Async/Await)...");
        const success = true;

        setTimeout(() => {
            if (success) {
                resolve("Dữ liệu đã được tải xong (Async/Await)!");
            } else {
                reject("Lỗi khi tải dữ liệu (Async/Await)!");
            }
        }, 2000);
    });
}

// Hàm async sử dụng await
async function processAsyncData() {
    try {
        const data = await fetchDataAsync(); // Tạm dừng cho đến khi Promise được giải quyết
        console.log("Xử lý dữ liệu thành công (Async/Await):", data);

        const moreData = await new Promise(resolve => {
            setTimeout(() => resolve("Dữ liệu bổ sung đã sẵn sàng!"), 1000);
        });
        console.log("Dữ liệu bổ sung:", moreData);

        return "Tất cả các tác vụ bất đồng bộ đã hoàn thành!";
    } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình bất đồng bộ:", error);
        throw error; // Ném lại lỗi để có thể bắt ở bên ngoài
    } finally {
        console.log("Tác vụ processAsyncData đã kết thúc.");
    }
}

// Gọi hàm async
processAsyncData()
    .then(finalResult => {
        console.log("Kết quả cuối cùng từ hàm async:", finalResult);
    })
    .catch(err => {
        console.error("Lỗi bên ngoài hàm async:", err);
    });

console.log("Tiếp tục thực thi các tác vụ khác (Async/Await)...");