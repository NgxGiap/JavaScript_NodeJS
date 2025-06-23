const fs = require('fs').promises; // Node.js cung cấp sẵn phiên bản Promise của module fs

async function readMultipleFiles() {
    try {
        console.log('Bắt đầu...');

        // Dùng await để chờ Promise từ fs.readFile hoàn thành
        const data1 = await fs.readFile('file1.txt', 'utf8');
        console.log('Đã đọc xong file 1.');

        // Dùng await để chờ Promise tiếp theo
        const data2 = await fs.readFile(data1.trim() + '.txt', 'utf8');
        console.log('Đã đọc xong file 2.');

        console.log('Nội dung file 2 là:', data2);

    } catch (error) {
        // Bất kỳ lỗi nào từ các câu lệnh await ở trên sẽ được bắt ở đây
        console.error('Đã xảy ra lỗi:', error);
    } finally {
        console.log('Kết thúc hàm readMultipleFiles.');
    }
}

// Gọi hàm async
readMultipleFiles();