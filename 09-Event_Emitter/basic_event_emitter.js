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