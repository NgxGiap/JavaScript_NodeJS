const fs = require('fs');

console.log("Bắt đầu đọc file (non-blocking)...");

// Đọc file một cách bất đồng bộ (non-blocking)
fs.readFile('data.txt', 'utf8', (err, data) => {
    // Hàm này (callback) sẽ chỉ được gọi khi việc đọc file hoàn tất
    if (err) {
        console.error(err);
        return;
    }
    console.log("Nội dung file:", data);
});

console.log("...Kết thúc chương trình.");