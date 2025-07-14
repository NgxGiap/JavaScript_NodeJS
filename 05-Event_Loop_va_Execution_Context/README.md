## 5. Execution Context và Event Loop

### A. Execution Context (Ngữ cảnh thực thi)

Mỗi khi code JavaScript được chạy, nó được chạy bên trong một **Execution Context**. Đây là một khái niệm trừu tượng, một "môi trường" mà JavaScript engine tạo ra để quản lý và thực thi code. Nó chứa thông tin về các biến, hàm, và phạm vi (scope) hiện tại.

Có hai loại Execution Context chính:

#### I. Global Execution Context (GEC - Ngữ cảnh thực thi toàn cục)

- Đây là context mặc định, được tạo ra đầu tiên khi JavaScript engine bắt đầu thực thi một script.

- Nó chỉ có một trong suốt vòng đời của một chương trình.

- Nó tạo ra hai thứ quan trọng:

  - Một đối tượng toàn cục: `window` trên trình duyệt, `global` trong Node.js.

  - Một biến `this` trỏ đến đối tượng toàn cục đó (trong non-strict mode).

- Tất cả code không nằm trong bất kỳ hàm nào sẽ được thực thi trong GEC.

#### II. Function Execution Context (FEC - Ngữ cảnh thực thi hàm)

- Mỗi khi một hàm được gọi, một Function Execution Context mới sẽ được tạo ra cho hàm đó.

- Mỗi hàm có context riêng của nó.

- Context này chứa thông tin về các tham số của hàm, các biến cục bộ và đối tượng `arguments`.

- Khi hàm thực thi xong, context của nó sẽ bị phá hủy.

##### Call Stack (Ngăn xếp cuộc gọi)

JavaScript là ngôn ngữ đơn luồng (single-threaded), nghĩa là nó chỉ có thể làm một việc tại một thời điểm. Để quản lý các Execution Context, nó sử dụng một cấu trúc dữ liệu gọi là **Call Stack** (LIFO - Last In, First Out).

- Khi một script bắt đầu, GEC được đẩy vào Call Stack.

- Mỗi khi một hàm được gọi, FEC của nó được tạo và đẩy lên trên đỉnh của Call Stack.

- Khi hàm đó `return` (hoặc kết thúc), FEC của nó được lấy ra (pop) khỏi Call Stack.

- Chương trình kết thúc khi Call Stack rỗng.

  File: `./call_stack_example.js`

```
function first() {
    console.log('Inside first function');
    second();
    console.log('Exiting first function');
}

function second() {
    console.log('Inside second function');
    third();
    console.log('Exiting second function');
}

function third() {
    console.log('Inside third function');
    // Khi third() kết thúc, nó được pop khỏi Call Stack
}

console.log('Global context starts');
first(); // Gọi hàm first, đẩy FEC của first vào Call Stack
console.log('Global context ends');

/*
Thứ tự thực thi và Call Stack:
1. Global context starts (console.log)
2. first() được gọi, FEC của first được đẩy vào Stack
   - Console: 'Inside first function'
3. second() được gọi bên trong first(), FEC của second được đẩy vào Stack
   - Console: 'Inside second function'
4. third() được gọi bên trong second(), FEC của third được đẩy vào Stack
   - Console: 'Inside third function'
5. third() kết thúc, FEC của third được POP
6. Console: 'Exiting second function'
7. second() kết thúc, FEC của second được POP
8. Console: 'Exiting first function'
9. first() kết thúc, FEC của first được POP
10. Console: 'Global context ends'
11. Global context kết thúc, GEC được POP. Stack rỗng.
*/
```

### B. Cơ chế hoạt động của Event Loop

Nếu JavaScript chỉ có Call Stack và là đơn luồng, làm sao nó có thể xử lý các tác vụ bất đồng bộ (non-blocking) như `setTimeout`, gọi API, hay đọc file? Đây là lúc Event Loop và các thành phần khác vào cuộc.

**Các thành phần chính:**

- **Call Stack:** Như đã giải thích ở trên.

- **Web APIs (trên trình duyệt) / C++ APIs (trong Node.js):** Môi trường chạy cung cấp các API để xử lý các tác vụ tốn thời gian (I/O, network, timer). Các API này chạy bên ngoài luồng chính của JavaScript.

- **Callback Queue (Hàng đợi Callback) / Task Queue:** Một hàng đợi (FIFO - First In, First Out) chứa các hàm callback sẵn sàng được thực thi.

- **Event Loop (Vòng lặp sự kiện):** Một tiến trình liên tục chạy, có nhiệm vụ kiểm tra xem Call Stack có rỗng không. Nếu rỗng, nó sẽ lấy tác vụ (task) từ Callback Queue và đẩy vào Call Stack để thực thi.

**Luồng hoạt động:**

1. Một hàm bất đồng bộ như **setTimeout(callback, 2000)** được gọi trong Call Stack.

2. `setTimeout` không được thực thi trực tiếp bởi JavaScript engine. Nó được chuyển cho Web API để xử lý bộ đếm thời gian. Call Stack bây giờ đã rảnh cho các công việc khác.

3. Trong khi đó, Call Stack tiếp tục thực thi các dòng code đồng bộ còn lại.

4. Sau 2000ms, Web API hoàn thành việc đếm giờ và đẩy hàm callback vào Callback Queue. Hàm này đang chờ đến lượt.

5. Event Loop liên tục kiểm tra. Khi nó thấy Call Stack đã rỗng (tức là mọi code đồng bộ đã chạy xong), nó sẽ lấy hàm callback từ Callback Queue và đẩy vào Call Stack.

6. Hàm callback được thực thi.

File: `./event_loop_setTimeout.js`

```
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
```

### C. Microtask và Macrotask

Để làm mọi thứ phức tạp hơn một chút, Callback Queue thực ra được chia thành 2 hàng đợi riêng biệt với độ ưu tiên khác nhau:

#### I. Macrotask Queue (hay còn gọi là Task Queue)

- Chứa các tác vụ như: `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O, render UI.

- Có thể coi đây là hàng đợi cho các tác vụ "lớn hơn", kém khẩn cấp hơn.

#### II. Microtask Queue

- Chứa các tác vụ như: `Promise.then()`, `Promise.catch()`, `Promise.finally()`, `process.nextTick()` (Node.js), `queueMicrotask()`.

- Đây là hàng đợi cho các tác vụ "nhỏ", cần được thực thi càng sớm càng tốt sau khi tác vụ hiện tại hoàn thành.

- **Microtask Queue có độ ưu tiên cao hơn Macrotask Queue.**

**Quy tắc của Event Loop:**

1. Thực thi một tác vụ từ Macrotask Queue (ví dụ: chạy script chính lúc đầu).

2. Sau khi macrotask đó hoàn thành, Event Loop sẽ thực thi **TẤT CẢ** các tác vụ có sẵn trong Microtask Queue cho đến khi hàng đợi này rỗng.

3. Sau khi Microtask Queue đã sạch, Event Loop sẽ quay lại và lấy tác vụ tiếp theo từ Macrotask Queue.

4. Lặp lại chu trình.

File: `./microtask_macrotask.js`

```
console.log('1. Start');

setTimeout(() => {
    console.log('4. setTimeout 1 (Macrotask)');
    Promise.resolve().then(() => {
        console.log('5. Promise inside setTimeout (Microtask)');
    });
}, 0);

Promise.resolve().then(() => {
    console.log('2. Promise 1 (Microtask)');
});

setTimeout(() => {
    console.log('6. setTimeout 2 (Macrotask)');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise 2 (Microtask)');
});

console.log('End');

/*
Thứ tự output dự kiến:
1. 1. Start (Global/Sync)
2. End (Global/Sync)
   -> Call Stack rỗng. Event Loop kiểm tra Microtask Queue.
3. 2. Promise 1 (Microtask)
4. 3. Promise 2 (Microtask)
   -> Microtask Queue rỗng. Event Loop kiểm tra Macrotask Queue.
5. 4. setTimeout 1 (Macrotask)
   -> Sau khi setTimeout 1 hoàn thành, Event Loop lại kiểm tra Microtask Queue (vì có Promise bên trong setTimeout).
6. 5. Promise inside setTimeout (Microtask)
   -> Microtask Queue rỗng. Event Loop kiểm tra Macrotask Queue.
7. 6. setTimeout 2 (Macrotask)
*/
```
