console.log('1: Script start'); // Sync

setTimeout(() => {
    console.log('5: setTimeout'); // Macrotask
}, 0);

Promise.resolve().then(() => {
    console.log('3: Promise 1'); // Microtask
}).then(() => {
    console.log('4: Promise 2'); // Microtask
});

console.log('2: Script end'); // Sync

// Phân tích và dự đoán output:

// Vòng lặp đầu tiên (Macrotask ban đầu là chạy toàn bộ script):
// In ra 1: Script start.
// Gặp setTimeout, callback của nó được đưa vào Macrotask Queue.
// Gặp Promise.resolve().then(), callback đầu tiên (() => console.log('3: Promise 1')) được đưa vào Microtask Queue.
// In ra 2: Script end.
// Kết thúc Macrotask hiện tại. Event Loop kiểm tra Microtask Queue.
// Nó thấy có tác vụ. Nó lấy () => console.log('3: Promise 1') ra và thực thi. In ra 3: Promise 1.
// Việc thực thi này trả về một Promise mới và .then() tiếp theo được nối vào. Callback thứ hai (() => console.log('4: Promise 2')) lại được đưa vào Microtask Queue.
// Event Loop lại kiểm tra Microtask Queue, thấy vẫn còn tác vụ. Nó lấy () => console.log('4: Promise 2') ra và thực thi. In ra 4: Promise 2.
// Bây giờ Microtask Queue đã rỗng.
// Event Loop kiểm tra Macrotask Queue.
// Nó thấy có callback của setTimeout. Nó lấy ra và thực thi. In ra 5: setTimeout.
// Cả hai queue đều rỗng. Chương trình chờ các sự kiện mới.