## 9. Event Emitter trong Node.js

### A. Giới thiệu Event Emitter

Trong Node.js, **Event Emitter** là một trong những khái niệm cốt lõi, là nền tảng cho mô hình lập trình hướng sự kiện (event-driven programming). Nó cho phép các đối tượng "phát ra" (emit) các sự kiện và các đối tượng khác "lắng nghe" (listen) và "phản hồi" (respond) lại các sự kiện đó.

Hầu hết các module cốt lõi của Node.js (như `fs` cho hệ thống file, `http` cho server web, `stream` cho luồng dữ liệu) đều kế thừa từ hoặc sử dụng Event Emitter để thông báo về các sự kiện xảy ra.

**Ý tưởng chính:**

**Emitter (Người phát ra):** Một đối tượng có khả năng phát ra các sự kiện.

**Listener (Người lắng nghe):** Một hàm (callback) được đăng ký để thực thi khi một sự kiện cụ thể được phát ra.

Tại sao nó quan trọng?

### B. Cách sử dụng và các ứng dụng thực tế

Để sử dụng Event Emitter, bạn cần import module `events` và tạo một instance của lớp `EventEmitter`.

**Các phương thức chính:**

Các phương thức chính:

- `emitter.on(eventName, listener)`: Đăng ký một hàm `listener` sẽ được gọi mỗi khi `eventName` được phát ra.

- `emitter.emit(eventName, [arg1], [arg2], ...)`: Phát ra `eventName`, gọi tất cả các `listener` đã đăng ký cho sự kiện đó theo thứ tự chúng được đăng ký. Các đối số bổ sung sẽ được truyền cho hàm `listener`.

- `emitter.once(eventName, listener)`: Đăng ký một `listener` chỉ được gọi **một lần duy nhất** khi `eventName` được phát ra, sau đó nó sẽ tự động bị hủy đăng ký.

- `emitter.off(eventName, listener)` / `emitter.removeListener(eventName, listener)`: Hủy đăng ký một `listener` cụ thể cho một `eventName`.

- `emitter.removeAllListeners([eventName])`: Hủy đăng ký tất cả `listener` cho một `eventName` cụ thể, hoặc tất cả `listener` cho tất cả các sự kiện nếu không có `eventName` nào được cung cấp.

**Ví dụ cơ bản:**

```
// basic_event_emitter.js
const EventEmitter = require('events');

// Tạo một instance của EventEmitter
const myEmitter = new EventEmitter();

// 1. Đăng ký một listener cho sự kiện 'greet'
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// 2. Đăng ký một listener khác cho cùng sự kiện 'greet'
myEmitter.on('greet', (name) => {
    console.log(`Nice to meet you, ${name}.`);
});

// 3. Đăng ký một listener chỉ chạy một lần cho sự kiện 'onceEvent'
myEmitter.once('onceEvent', () => {
    console.log('This will only run once!');
});

// Phát ra sự kiện 'greet'
console.log('--- Emitting "greet" event ---');
myEmitter.emit('greet', 'Alice'); // Cả hai listener của 'greet' sẽ chạy
myEmitter.emit('greet', 'Bob');   // Cả hai listener của 'greet' sẽ chạy

// Phát ra sự kiện 'onceEvent'
console.log('\n--- Emitting "onceEvent" event ---');
myEmitter.emit('onceEvent'); // Listener này sẽ chạy
myEmitter.emit('onceEvent'); // Listener này sẽ không chạy nữa

// Ví dụ về truyền nhiều đối số
myEmitter.on('dataReceived', (id, data) => {
    console.log(`\nData for ID ${id}: ${data}`);
});
myEmitter.emit('dataReceived', 101, { status: 'success', value: 123 });

// Ví dụ về hủy đăng ký listener
const specificListener = (msg) => {
    console.log('Specific message:', msg);
};
myEmitter.on('customEvent', specificListener);
myEmitter.emit('customEvent', 'First call');
myEmitter.off('customEvent', specificListener); // Hủy đăng ký
myEmitter.emit('customEvent', 'Second call'); // Listener sẽ không chạy
```

**Các ứng dụng thực tế:**

1. **Xây dựng Web Server (Module `http`):**

- Server HTTP trong Node.js là một Event Emitter.

- Bạn lắng nghe sự kiện `request` để xử lý các yêu cầu đến từ client.

```
const http = require('http');
  const server = http.createServer();

  server.on('request', (req, res) => {
      console.log(`Request received: ${req.method} ${req.url}`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
  });

  server.listen(3000, () => {
      console.log('Server running on port 3000');
  });
```

2. **Đọc/Ghi File (Module fs - Streams):**

- Các đối tượng Stream (như fs.createReadStream, fs.createWriteStream) là Event Emitter.

- Bạn lắng nghe các sự kiện như data (khi có dữ liệu mới), end (khi luồng kết thúc), error (khi có lỗi).

```
const fs = require('fs');
  const readableStream = fs.createReadStream('input.txt');
  const writableStream = fs.createWriteStream('output.txt');

  readableStream.on('data', (chunk) => {
      console.log(`Received ${chunk.length} bytes of data.`);
      writableStream.write(chunk); // Ghi dữ liệu vào file khác
  });

  readableStream.on('end', () => {
      console.log('Finished reading file.');
      writableStream.end();
  });

  readableStream.on('error', (err) => {
      console.error('Error reading file:', err.message);
  });

  writableStream.on('finish', () => {
      console.log('Finished writing file.');
  });
```

3. **Xây dựng các hệ thống tùy chỉnh hướng sự kiện:**

- Khi bạn có các thành phần trong ứng dụng cần giao tiếp với nhau mà không phụ thuộc trực tiếp vào nhau.

- Ví dụ: Một module xử lý thanh toán có thể phát ra sự kiện `paymentSuccess` hoặc `paymentFailed`, và các module khác (quản lý đơn hàng, gửi email, cập nhật kho) sẽ lắng nghe các sự kiện này để thực hiện tác vụ của chúng.

```
// custom_event_system.js
  const EventEmitter = require('events');

  class PaymentProcessor extends EventEmitter {
      processPayment(amount, userId) {
          console.log(`Processing payment for user ${userId} with amount ${amount}...`);
          // Giả lập quá trình xử lý thanh toán
          setTimeout(() => {
              const success = Math.random() > 0.3; // 70% thành công
              if (success) {
                  this.emit('paymentSuccess', userId, amount, Date.now());
              } else {
                  this.emit('paymentFailed', userId, amount, 'Insufficient funds');
              }
          }, 1500);
      }
  }

  const processor = new PaymentProcessor();

  // Module quản lý đơn hàng lắng nghe
  processor.on('paymentSuccess', (userId, amount, timestamp) => {
      console.log(`[Order Manager] User ${userId} payment of ${amount} successful at ${new Date(timestamp).toLocaleTimeString()}. Updating order status.`);
  });

  // Module gửi email lắng nghe
  processor.on('paymentSuccess', (userId, amount) => {
      console.log(`[Email Service] Sending confirmation email to user ${userId} for ${amount}.`);
  });

  processor.on('paymentFailed', (userId, amount, reason) => {
      console.error(`[Error Handler] Payment for user ${userId} failed. Reason: ${reason}. Logging error.`);
  });

  // Kích hoạt quá trình thanh toán
  processor.processPayment(100, 'user_123');
  processor.processPayment(50, 'user_456');
  processor.processPayment(200, 'user_789');
```
