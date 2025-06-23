const fs = require('fs');

const readStream = fs.createReadStream('./largeFile.txt'); // Giả sử đây là một file lớn
let chunkCount = 0;

// Lắng nghe sự kiện 'data'
readStream.on('data', (chunk) => {
    chunkCount++;
    console.log(`Nhận được chunk thứ ${chunkCount}. Kích thước: ${chunk.length} bytes.`);
    // Ở đây bạn có thể xử lý từng phần dữ liệu mà không cần đợi đọc hết file
});

// Lắng nghe sự kiện 'end'
readStream.on('end', () => {
    console.log('Đã đọc xong toàn bộ file!');
});

// Lắng nghe sự kiện 'error'
readStream.on('error', (err) => {
    console.error('Đã xảy ra lỗi khi đọc file:', err);
});