console.log('Start script');

setTimeout(() => {
    console.log('Timeout callback executed (from Callback Queue)');
}, 0); // Đặt thời gian là 0ms, nhưng vẫn là tác vụ bất đồng bộ

Promise.resolve().then(() => {
    console.log('Promise resolved (from Microtask Queue)');
});

console.log('End script (synchronous code)');

/*
Thứ tự output:
1. "Start script" (đồng bộ)
2. "End script (synchronous code)" (đồng bộ)
3. "Promise resolved (from Microtask Queue)" (Microtask có ưu tiên cao hơn Macrotask)
4. "Timeout callback executed (from Callback Queue)" (Macrotask)

Giải thích:
- `console.log('Start script')` và `console.log('End script (synchronous code)')` là code đồng bộ, được thực thi ngay lập tức.
- `setTimeout` được gửi đến Web APIs. Sau 0ms, callback của nó được đẩy vào Macrotask Queue.
- `Promise.resolve().then()` được gửi đến Microtask Queue.
- Sau khi tất cả code đồng bộ trong Global Execution Context hoàn thành, Event Loop kiểm tra.
- Nó thấy Microtask Queue có tác vụ (`Promise.then()`), nên nó ưu tiên đẩy tác vụ này vào Call Stack.
- Sau khi Microtask Queue rỗng, Event Loop kiểm tra Macrotask Queue.
- Nó thấy tác vụ `setTimeout` và đẩy vào Call Stack để thực thi.
*/