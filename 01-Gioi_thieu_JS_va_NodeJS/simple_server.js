// Import module 'http' có sẵn của Node.js
const http = require('http');

// Định nghĩa cổng mà máy chủ sẽ lắng nghe
const port = 3000;

// Tạo một máy chủ
const server = http.createServer((req, res) => {
    // req: request (yêu cầu từ client)
    // res: response (phản hồi từ server)

    // Thiết lập mã trạng thái và kiểu nội dung phản hồi
    res.statusCode = 200; // 200 có nghĩa là OK
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Gửi nội dung phản hồi về cho client
    res.end('Xin chào! Đây là server Node.js đầu tiên của bạn.\n');
});

// Cho máy chủ bắt đầu lắng nghe các yêu cầu đến ở cổng đã định nghĩa
server.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}/`);
});