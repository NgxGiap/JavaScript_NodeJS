const fs = require('fs'); // fs = file system

console.log("Bắt đầu đọc file (blocking)...");

// Đọc file một cách đồng bộ (blocking)
try {
    const data = fs.readFileSync('data.txt', 'utf8');
    console.log("Nội dung file:", data);
} catch (err) {
    console.error(err);
}

console.log("...Kết thúc chương trình.");