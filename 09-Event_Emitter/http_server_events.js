const http = require('http');

const server = http.createServer(); // Không cần truyền callback vào đây

// Lắng nghe sự kiện 'request'
server.on('request', (req, res) => {
    console.log(`Nhận được yêu cầu cho: ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server đang lắng nghe sự kiện!');
});

// Lắng nghe sự kiện 'listening'
server.on('listening', () => {
    console.log('Server đã bắt đầu lắng nghe trên cổng 3000!');
});

server.listen(3000);