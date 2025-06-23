console.log('Bắt đầu'); // 1

setTimeout(() => {
    console.log('Bên trong setTimeout'); // 3
}, 0);

console.log('Kết thúc'); // 2

// console.log('Bắt đầu') được đẩy vào Call Stack và thực thi ngay lập tức.
// setTimeout được đẩy vào Call Stack. Nó được chuyển cho Web API xử lý timer (dù là 0ms) và bị pop ra khỏi Call Stack. Hàm callback () => {...} chưa được chạy.
// console.log('Kết thúc') được đẩy vào Call Stack và thực thi ngay.
// Lúc này Call Stack đã rỗng. Web API ngay lập tức (vì delay là 0ms) đẩy hàm callback vào Callback Queue.
// Event Loop thấy Call Stack rỗng, nó bốc callback từ Queue vào Stack.
// Callback được thực thi, in ra 'Bên trong setTimeout'.