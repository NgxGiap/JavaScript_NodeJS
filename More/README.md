## Event Loop là gì?

**Event Loop** là một cơ chế quan trọng trong các môi trường lập trình bất đồng bộ (asynchronous programming), đặc biệt phổ biến trong JavaScript (Node.js, trình duyệt), Python (asyncio), và nhiều ngôn ngữ khác. Mục đích chính của Event Loop là cho phép các chương trình thực hiện các tác vụ không chặn (non-blocking operations) như I/O (đọc/ghi file, request mạng), timers, và tương tác người dùng mà không làm đơ ứng dụng. Điều này đảm bảo rằng ứng dụng luôn phản hồi nhanh chóng và hiệu quả.

## Các thành phần chính của Event Loop

Event Loop không hoạt động một mình mà là sự kết hợp của nhiều thành phần. Dưới đây là các thành phần cơ bản và cơ chế hoạt động của chúng:

**1. Call Stack (Stack cuộc gọi)**

**Call Stack** là một cấu trúc dữ liệu LIFO (Last-In, First-Out) dùng để lưu trữ các hàm đang được thực thi. Khi một hàm được gọi, nó sẽ được thêm vào đỉnh của Call Stack. Khi hàm đó hoàn thành, nó sẽ được loại bỏ khỏi Call Stack. Các tác vụ đồng bộ (synchronous tasks) được thực thi trực tiếp trên Call Stack.

**Ví dụ:**

```
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(5);
```

**Cơ chế hoạt động:**

1. `printSquare(5)` được thêm vào Call Stack.

2. Bên trong `printSquare`, `square(5)` được gọi và thêm vào Call Stack.

3. Bên trong `square`, `multiply(5, 5)` được gọi và thêm vào Call Stack.

4. `multiply(5, 5)` trả về 25, bị loại khỏi Call Stack.

5. `square(5)` trả về 25, bị loại khỏi Call Stack.

6. `console.log(25)` được gọi (nó là một Web API, nhưng trong ví dụ này coi như đồng bộ), xử lý và bị loại khỏi Call Stack.

7. `printSquare(5)` hoàn thành và bị loại khỏi Call Stack.

**2. Web APIs (trong trình duyệt) / Node.js APIs (trong Node.js)**

Đây là các môi trường mà JavaScript (hoặc các ngôn ngữ khác) có thể tương tác để thực hiện các tác vụ bất đồng bộ. Chúng cung cấp các hàm và tính năng không chặn như:

- Timers: `setTimeout()`, `setInterval()`

- HTTP Requests: `fetch()`, `XMLHttpRequest`

- DOM Events: `click`, `scroll`, `load`

- File I/O: (trong Node.js) `fs.readFile()`, `fs.writeFile()`

- Khi một hàm bất đồng bộ như `setTimeout` được gọi, nó sẽ được chuyển giao cho Web API (hoặc Node.js API) tương ứng để xử lý. API này sẽ thực hiện công việc bất đồng bộ ở chế độ nền.

**Ví dụ:**

```
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0); // Đặt thời gian chờ là 0ms

console.log('End');
```

**Cơ chế hoạt động:**

1. `console.log('Start')` được thêm vào Call Stack, thực thi, và loại bỏ.

2. `setTimeout()` được thêm vào Call Stack. Nó nhận callback function và thời gian chờ, sau đó chuyển giao công việc cho Web APIs. `setTimeout()` bị loại khỏi Call Stack ngay lập tức (không chờ đợi).

3. `console.log('End')` được thêm vào Call Stack, thực thi, và loại bỏ.

4. Lúc này Call Stack rỗng.

5. Web APIs đã xử lý xong `setTimeout` (ngay lập tức vì thời gian chờ là 0ms). Callback function của `setTimeout` được chuyển vào Queue (hàng đợi).

**3. Callback Queue (Message Queue / Task Queue)**

**Callback Queue** là một hàng đợi FIFO (First-In, First-Out) chứa các hàm callback đã sẵn sàng để được thực thi. Khi một tác vụ bất đồng bộ do Web APIs xử lý hoàn tất, hàm callback tương ứng sẽ được đẩy vào Callback Queue.

**Ví dụ (tiếp theo ví dụ `setTimeout`):**

Sau khi Web API xử lý xong `setTimeout(..., 0)`, callback function `() => { console.log('Timeout callback'); }` được đẩy vào Callback Queue.

**4. Microtask Queue (Job Queue)**

Ngoài Callback Queue, có một hàng đợi ưu tiên cao hơn được gọi là Microtask Queue. Hàng đợi này chứa các callback từ các Promise (ví dụ: `.then()`, `.catch()`, `.finally()`) và `queueMicrotask()`. Microtask Queue được xử lý trước Callback Queue trong mỗi vòng lặp của Event Loop.

**Ví dụ:**

```
console.log('Start');

Promise.resolve().then(() => {
  console.log('Promise callback');
});

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

console.log('End');
```

**Cơ chế hoạt động:**

1. `console.log('Start')` được thực thi.

2. `Promise.resolve().then(...)` được thêm vào Call Stack. Callback của Promise được chuyển vào **Microtask Queue**. `Promise.resolve().then()` bị loại khỏi Call Stack.

3. `setTimeout()` được thêm vào Call Stack. Callback của `setTimeout` được chuyển cho Web APIs. `setTimeout()` bị loại khỏi Call Stack.

4. `console.log('End')` được thực thi.

5. Call Stack rỗng. Event Loop bắt đầu kiểm tra.

6. **Event Loop ưu tiên kiểm tra Microtask Queue trước**. Nó thấy `console.log('Promise callback')` và đẩy vào Call Stack để thực thi.

7. `console.log('Promise callback')` được thực thi và loại bỏ khỏi Call Stack. Microtask Queue rỗng.

8. `Event Loop kiểm tra Callback Queue`. Nó thấy `console.log('Timeout callback')` và đẩy vào Call Stack để thực thi.

9. `console.log('Timeout callback')` được thực thi và loại bỏ khỏi Call Stack. Callback Queue rỗng.

10. Event Loop tiếp tục vòng lặp, chờ đợi các tác vụ mới.

**Thứ tự output sẽ là:**

```
Start
End
Promise callback
Timeout callback
```

**5. Event Loop**

**Event Loop** là "trái tim" của hệ thống bất đồng bộ. Công việc của nó là liên tục kiểm tra xem Call Stack có rỗng hay không. Nếu Call Stack rỗng, Event Loop sẽ:

1. Kiểm tra và xử lý tất cả các tác vụ trong **Microtask Queue** trước. Nó sẽ đẩy từng microtask vào Call Stack để thực thi cho đến khi Microtask Queue rỗng.

2. Sau khi Microtask Queue rỗng, nó sẽ kiểm tra **Callback Queue**. Nếu có tác vụ nào trong Callback Queue, nó sẽ lấy tác vụ đầu tiên và đẩy vào Call Stack để thực thi.

3. Quá trình này lặp lại liên tục, cho phép các tác vụ bất đồng bộ được thực thi khi tác vụ đồng bộ đã hoàn thành và Call Stack rỗng.

## Cơ chế hoạt động tổng thể của Event Loop

Hãy hình dung Event Loop như một vòng lặp vô hạn luôn chạy trong nền:

1. **Thực thi Call Stack:** Bất kỳ mã đồng bộ nào cũng được đẩy vào Call Stack và thực thi ngay lập tức.

2. **Giao tác vụ bất đồng bộ cho Web APIs/Node.js APIs:** Khi gặp một hàm bất đồng bộ (ví dụ: `setTimeout`, `fetch`, `fs.readFile`), hàm đó được đưa vào Call Stack, nhưng bản thân việc thực hiện tác vụ bất đồng bộ được giao cho Web APIs/Node.js APIs để xử lý ở chế độ nền. Hàm gốc bị loại khỏi Call Stack ngay lập tức.

3. **Hoàn thành tác vụ bất đồng bộ và đẩy callback vào Queue:** Khi Web APIs/Node.js APIs hoàn thành công việc bất đồng bộ, hàm callback liên quan sẽ được đẩy vào một trong hai hàng đợi:

- **Microtask Queue** (đối với Promise, `queueMicrotask`).

- **Callback Queue** (đối với `setTimeout`, `setInterval`, I/O, sự kiện DOM).

4. **Kiểm tra Call Stack và xử lý Queue:** Event Loop liên tục kiểm tra Call Stack.

- Nếu Call Stack **rỗng**, Event Loop sẽ ưu tiên kiểm tra **Microtask Queue**. Nó sẽ lấy và đẩy tất cả các tác vụ trong Microtask Queue vào Call Stack để thực thi cho đến khi Microtask Queue rỗng.

- Sau khi Microtask Queue rỗng (hoặc nếu nó đã rỗng), Event Loop sẽ kiểm tra **Callback Queue**. Nếu có tác vụ trong Callback Queue, nó sẽ lấy tác vụ đầu tiên và đẩy vào Call Stack để thực thi.

5. **Lặp lại:** Quá trình này tiếp tục lặp lại. Điều này đảm bảo rằng các tác vụ đồng bộ luôn được ưu tiên, và các tác vụ bất đồng bộ chỉ được thực thi khi không có mã đồng bộ nào đang chạy và hệ thống sẵn sàng.

**Ví dụ chi tiết về cơ chế hoạt động**

```
console.log('A'); // 1

setTimeout(() => {
  console.log('B'); // 3
}, 0);

Promise.resolve().then(() => {
  console.log('C'); // 2
});

console.log('D'); // 1

function syncTask() {
  console.log('E'); // 1
}

syncTask();
```

**Phân tích từng bước:**

**1. Execution Phase (Phase Đồng bộ):**

- `console.log('A')` được đẩy vào Call Stack, thực thi, in ra `A`, và loại bỏ.

- `setTimeout(() => { console.log('B'); }, 0)` được đẩy vào Call Stack. Callback `() => { console.log('B'); }` được chuyển cho Web APIs. `setTimeout` bị loại bỏ khỏi Call Stack ngay lập tức. (Web APIs bắt đầu hẹn giờ 0ms cho callback 'B').

- `Promise.resolve().then(() => { console.log('C'); })` được đẩy vào Call Stack. `Promise.resolve()` tạo ra một Promise đã được giải quyết. Callback `() => { console.log('C'); }` được đẩy vào **Microtask Queue**. .`then()` bị loại bỏ khỏi Call Stack.

- `console.log('D')` được đẩy vào Call Stack, thực thi, in ra `D`, và loại bỏ.

- `syncTask()` được đẩy vào Call Stack.

- Bên trong `syncTask()`, `console.log('E')` được đẩy vào Call Stack, thực thi, in ra `E`, và loại bỏ.

- `syncTask()` bị loại bỏ khỏi Call Stack.

- **Tại thời điểm này, Call Stack rỗng**. Output hiện tại: `A D E`

**2. Event Loop Phase (Phase Bất đồng bộ):**

- **Event Loop kiểm tra Microtask Queue:** Nó thấy `() => { console.log('C'); }`.

- Callback `() => { console.log('C'); }` được đẩy vào Call Stack.

- `console.log('C')` được thực thi, in ra `C`, và loại bỏ.

- Callback `() => { console.log('C'); }` bị loại bỏ khỏi Call Stack.

- `Microtask Queue hiện rỗng`. Output hiện tại: `A D E C`

- **Event Loop kiểm tra Callback Queue:** (Web APIs đã hoàn thành việc hẹn giờ 0ms cho callback 'B' và đã đẩy nó vào Callback Queue). Event Loop thấy `() => { console.log('B'); }`.

- Callback `() => { console.log('B'); }` được đẩy vào Call Stack.

- `console.log('B')` được thực thi, in ra `B`, và loại bỏ.

- Callback `() => { console.log('B'); }` bị loại bỏ khỏi Call Stack.

- **Callback Queue hiện rỗng**. Output hiện tại: `A D E C B`

**3. Vòng lặp tiếp tục:** Call Stack rỗng, cả Microtask Queue và Callback Queue đều rỗng. Event Loop tiếp tục chờ đợi các tác vụ mới.

**Thứ tự output cuối cùng sẽ là:**

```
A
D
E
C
B
```

## Tầm quan trọng của Event Loop

Event Loop là nền tảng cho sự hiệu quả của các ứng dụng bất đồng bộ. Nó giúp:

- **Ngăn chặn chặn luồng chính (main thread blocking):** Đảm bảo rằng UI của ứng dụng (trong trình duyệt) hoặc server (trong Node.js) không bị đơ khi thực hiện các tác vụ tốn thời gian.

- **Xử lý đồng thời (concurrency):** Cho phép các tác vụ diễn ra song song (không thực sự song song về mặt vật lý, mà là xen kẽ rất nhanh), tạo cảm giác hiệu suất cao.

- **Phản hồi nhanh chóng:** Ứng dụng luôn sẵn sàng phản hồi các tương tác của người dùng hoặc các sự kiện mạng.

Hiểu rõ về Event Loop là chìa khóa để viết mã bất đồng bộ hiệu quả, tránh các lỗi phổ biến như "blocking" hoặc "race condition" (tình trạng tranh chấp).
