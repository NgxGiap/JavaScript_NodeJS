console.log("Callback============================");
const fs = require('fs');

fs.readFile('file-khong-ton-tai.txt', 'utf8', (error, data) => {
    // Bước 1: Luôn kiểm tra lỗi trước tiên!
    if (error) {
        console.error("Lỗi khi đọc file (Callback):", error.message);
        // Dừng thực thi tại đây để tránh xử lý 'data' không tồn tại
        return;
    }

    // Chỉ chạy khi không có lỗi
    console.log("Nội dung file:", data);
});

console.log("Promise============================");

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error); // Reject promise nếu có lỗi
            } else {
                resolve(data);
            }
        });
    });
}

readFilePromise('file-khong-ton-tai.txt')
    .then(data => {
        console.log("Đoạn code này sẽ không được chạy.");
        const jsonData = JSON.parse(data); // Một lỗi khác có thể xảy ra ở đây
        return jsonData;
    })
    .then(jsonData => {
        console.log(jsonData);
    })
    .catch(error => {
        // Bắt TẤT CẢ các lỗi từ các .then() ở trên hoặc từ Promise ban đầu
        console.error("Lỗi trong chuỗi Promise:", error.message);
    });

    console.log("async============================");

const fsPromises = require('fs').promises;

async function readAndProcessFile() {
    try {
        // await một promise bị reject sẽ ném ra lỗi
        const data = await fsPromises.readFile('file-khong-ton-tai.txt', 'utf8');
        console.log("Đoạn này sẽ không chạy.");

        // Một lỗi đồng bộ cũng sẽ được bắt
        const jsonData = JSON.parse(data); // Nếu file không phải JSON, lỗi sẽ được bắt
        console.log(jsonData);

    } catch (error) {
        // Bắt cả lỗi bất đồng bộ (từ await) và lỗi đồng bộ (từ JSON.parse)
        console.error("Lỗi trong hàm async:", error.message);
    }
}

readAndProcessFile();