const EventEmitter = require('events');

// Tạo một thực thể (instance) của EventEmitter
const myEmitter = new EventEmitter();

// 1. Đăng ký một listener cho sự kiện 'greet'
myEmitter.on('greet', (name) => {
    console.log(`Xin chào, ${name}!`);
});

// 2. Đăng ký một listener khác cho cùng sự kiện 'greet'
myEmitter.on('greet', (name) => {
    console.log(`Rất vui được gặp bạn, ${name}.`);
});

// 3. Đăng ký một listener chỉ chạy một lần cho sự kiện 'special'
myEmitter.once('special', () => {
    console.log('Đây là một sự kiện đặc biệt, chỉ xảy ra một lần!');
});


// 4. Phát ra sự kiện 'greet' với đối số 'Thực tập sinh'
console.log("Phát sự kiện 'greet' lần đầu:");
myEmitter.emit('greet', 'Thực tập sinh');

console.log('\n---');

// 5. Phát ra sự kiện 'special'
console.log("Phát sự kiện 'special' lần đầu:");
myEmitter.emit('special');

console.log("Phát sự kiện 'special' lần thứ hai:");
myEmitter.emit('special'); // Sẽ không có gì xảy ra vì listener đã bị gỡ

console.log('\n---');

// 6. Phát lại sự kiện 'greet'
console.log("Phát sự kiện 'greet' lần thứ hai:");
myEmitter.emit('greet', 'Developer');