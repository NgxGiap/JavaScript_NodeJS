## 6. Xử lý bất đồng bộ trong JavaScript và Node.js

### A. Callback: Cách hoạt động và hạn chế

Trong JavaScript, các tác vụ bất đồng bộ (như đọc file, gọi API, thiết lập hẹn giờ) không chặn luồng thực thi chính. Để xử lý kết quả của các tác vụ này khi chúng hoàn thành, chúng ta sử dụng **Callback Functions.**

**Cách hoạt động:**

Một callback là một hàm được truyền dưới dạng đối số cho một hàm khác, và hàm đó sẽ được gọi lại (thực thi) sau khi tác vụ bất đồng bộ hoàn thành.

**Ví dụ:**

```
// Hàm mô phỏng một tác vụ bất đồng bộ (ví dụ: tải dữ liệu)
function fetchData(callback) {
    console.log("Đang tải dữ liệu...");
    setTimeout(() => {
        const data = "Dữ liệu đã được tải xong!";
        callback(data); // Gọi lại hàm callback khi tác vụ hoàn tất
    }, 2000);
}

// Hàm callback
function processData(data) {
    console.log("Xử lý dữ liệu:", data);
}

// Gọi hàm fetchData và truyền processData làm callback
fetchData(processData);
console.log("Tiếp tục thực thi các tác vụ khác..."); // Dòng này sẽ chạy ngay lập tức
```

**Hạn chế (Callback Hell / Pyramid of Doom):**

Khi có nhiều tác vụ bất đồng bộ phụ thuộc vào nhau, việc sử dụng callbacks lồng nhau có thể dẫn đến cấu trúc code khó đọc, khó bảo trì, và khó xử lý lỗi, thường được gọi là "Callback Hell" hoặc "Pyramid of Doom".

`./callback_hell.js`

### B.Promise: Cấu trúc và cách sử dụng

**Promise** là một đối tượng đại diện cho việc hoàn thành (hoặc thất bại) cuối cùng của một thao tác bất đồng bộ. Nó giúp xử lý các tác vụ bất đồng bộ một cách có tổ chức hơn, tránh "Callback Hell".

**Cấu trúc một Promise:**

Một Promise có 3 trạng thái:

- **Pending (Đang chờ):** Trạng thái ban đầu, chưa hoàn thành cũng chưa thất bại.

- **Fulfilled (Đã hoàn thành):** Thao tác bất đồng bộ đã hoàn thành thành công.

- **Rejected (Đã thất bại):** Thao tác bất đồng bộ đã thất bại.

Khi một Promise chuyển từ `Pending` sang `Fulfilled` hoặc `Rejected`, nó được gọi là **Settled** (đã giải quyết) và trạng thái của nó sẽ không bao giờ thay đổi nữa.

**Cách sử dụng:**

Promise được tạo bằng constructor `new Promise()` nhận một hàm `executor` làm đối số. Hàm `executor` này có hai tham số: `resolve` và `reject`.

- `resolve(value)`: Gọi khi tác vụ thành công, chuyển Promise sang trạng thái `Fulfilled` với `value`.

- `reject(error)`: Gọi khi tác vụ thất bại, chuyển Promise sang trạng thái `Rejected` với `error`.

Để xử lý kết quả của Promise, chúng ta sử dụng các phương thức `.then()` và `.catch()`:

- `.then(onFulfilled, onRejected)`: Được gọi khi Promise thành công `(onFulfilled)` hoặc thất bại `(onRejected)`.

- `.catch(onRejected)`: Một cách viết tắt cho `.then(null, onRejected)`, dùng để xử lý lỗi.

- `.finally(onFinally)`: Được gọi khi Promise hoàn thành (dù thành công hay thất bại), dùng để thực hiện các tác vụ dọn dẹp.

**Ví dụ:** `./promises.js`

### C.Async/Await: Cú pháp và ứng dụng

**Async/Await** là cú pháp được xây dựng trên Promise, giúp viết code bất đồng bộ trông giống như code đồng bộ, làm cho nó dễ đọc và dễ bảo trì hơn rất nhiều.

**Đặc điểm:**

`async` **function**: Một hàm được khai báo với từ khóa `async` luôn trả về một Promise. Nếu hàm `async` trả về một giá trị không phải Promise, JavaScript sẽ tự động bọc giá trị đó vào một Promise đã được giải quyết (`resolved Promise`).

`await` **keyword**: Chỉ có thể được sử dụng bên trong một hàm `async`. `await` sẽ tạm dừng việc thực thi của hàm `async` cho đến khi Promise mà nó đang `await` được giải quyết (fulfilled hoặc rejected). Khi Promise được giải quyết, giá trị của Promise sẽ được trả về. Nếu Promise bị từ chối, `await` sẽ ném ra lỗi.

**Ứng dụng:**

`Async/Await` giúp loại bỏ hoàn toàn "Callback Hell" và làm cho chuỗi Promise trở nên tuyến tính, dễ hiểu hơn.
./async_await.js

```
// Hàm mô phỏng tải dữ liệu bằng Promise (tái sử dụng từ ví dụ trên)
function fetchDataAsync() {
    return new Promise((resolve, reject) => {
        console.log("Đang tải dữ liệu (Async/Await)...");
        const success = true;

        setTimeout(() => {
            if (success) {
                resolve("Dữ liệu đã được tải xong (Async/Await)!");
            } else {
                reject("Lỗi khi tải dữ liệu (Async/Await)!");
            }
        }, 2000);
    });
}

// Hàm async sử dụng await
async function processAsyncData() {
    try {
        const data = await fetchDataAsync(); // Tạm dừng cho đến khi Promise được giải quyết
        console.log("Xử lý dữ liệu thành công (Async/Await):", data);

        const moreData = await new Promise(resolve => {
            setTimeout(() => resolve("Dữ liệu bổ sung đã sẵn sàng!"), 1000);
        });
        console.log("Dữ liệu bổ sung:", moreData);

        return "Tất cả các tác vụ bất đồng bộ đã hoàn thành!";
    } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình bất đồng bộ:", error);
        throw error; // Ném lại lỗi để có thể bắt ở bên ngoài
    } finally {
        console.log("Tác vụ processAsyncData đã kết thúc.");
    }
}

// Gọi hàm async
processAsyncData()
    .then(finalResult => {
        console.log("Kết quả cuối cùng từ hàm async:", finalResult);
    })
    .catch(err => {
        console.error("Lỗi bên ngoài hàm async:", err);
    });

console.log("Tiếp tục thực thi các tác vụ khác (Async/Await)...");
```
