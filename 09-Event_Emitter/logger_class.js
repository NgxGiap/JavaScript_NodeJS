const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        // Phát ra một sự kiện để các thành phần khác có thể biết
        this.emit('logMessage', { id: Date.now(), text: message });
    }
}

const logger = new Logger();

// Một module khác có thể lắng nghe logger
logger.on('logMessage', (logData) => {
    // Ví dụ: Ghi log này vào một file hoặc CSDL
    console.log(`[Listener]: Đã ghi nhận log mới - ID: ${logData.id}`);
});

logger.log("Hệ thống khởi động thành công.");
logger.log("Người dùng 'admin' đã đăng nhập.");