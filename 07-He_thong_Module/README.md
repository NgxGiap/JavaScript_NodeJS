## 7. Hệ thống Module trong Node.js

Trong Node.js, hệ thống module cho phép bạn tổ chức code thành các file riêng biệt, giúp tái sử dụng, bảo trì và quản lý dự án dễ dàng hơn. Có hai hệ thống module chính được sử dụng: **CommonJS** và **ES Modules (ESM)**.

### A. CommonJS (CJS): Cách hoạt động và cú pháp

**CommonJS** là hệ thống module mặc định và truyền thống của Node.js. Nó được thiết kế cho môi trường server-side và hoạt động dựa trên cơ chế đồng bộ.

**Cách hoạt động:**

- `require()`: Dùng để nhập (import) các module khác. Khi bạn gọi `require()`, Node.js sẽ tìm kiếm module đó, thực thi nó (nếu chưa được thực thi), và trả về đối tượng `exports` của module đó. Quá trình này diễn ra **đồng bộ**, nghĩa là code sẽ dừng lại và chờ cho đến khi module được tải xong.

- `module.exports` / `exports`: Dùng để xuất (export) các giá trị từ một module.

  - `module.exports`: Là đối tượng thực sự được trả về khi `require()` một module. Bạn có thể gán trực tiếp một giá trị (hàm, đối tượng, biến) cho `module.exports`.

  - `exports`: Là một tham chiếu đến `module.exports`. Bạn có thể thêm các thuộc tính vào `exports` để xuất nhiều thứ. Tuy nhiên, nếu bạn gán lại `exports` (ví dụ: `exports = someValue`), thì tham chiếu sẽ bị phá vỡ và `module.exports` vẫn giữ giá trị ban đầu. Luôn ưu tiên `module.exports` khi bạn muốn xuất một giá trị duy nhất hoặc thay thế toàn bộ đối tượng xuất.

**Cú pháp:**

File: `./math.js` (Module xuất)

```
// math.js (CommonJS module)

// Cách 1: Thêm thuộc tính vào exports
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// Cách 2: Gán trực tiếp cho module.exports (thường dùng khi muốn export một giá trị duy nhất)
// module.exports = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b
// };
```

File: `./app.js` (Module nhập)

```
// app.js (CommonJS module)
const math = require('./math'); // Nhập toàn bộ đối tượng exports
const { add, subtract } = require('./math'); // Nhập cụ thể các hàm bằng destructuring

console.log('CommonJS Examples:');
console.log(`2 + 3 = ${math.add(2, 3)}`);       // Output: 2 + 3 = 5
console.log(`10 - 4 = ${subtract(10, 4)}`); // Output: 10 - 4 = 6

// Ví dụ về cách module được thực thi một lần duy nhất
const anotherMath = require('./math'); // Sẽ không thực thi lại math.js
console.log('Calling math again via anotherMath:', anotherMath.add(5, 5));
```

### B.ES Modules (ESM): Sự khác biệt và cách sử dụng

**ES Modules (ESM)** là hệ thống module chính thức của JavaScript, được giới thiệu trong ES6 (ECMAScript 2015). Nó được thiết kế cho cả môi trường trình duyệt và Node.js, hoạt động dựa trên cơ chế bất đồng bộ và có cú pháp rõ ràng hơn.

**Sự khác biệt chính so với CommonJS:**

- **Cú pháp:** Sử dụng `import` và `export` thay vì `require()` và `module.exports`/`exports`.

- **Hoạt động bất đồng bộ:** ESM được tải bất đồng bộ, giúp tối ưu hóa hiệu suất, đặc biệt trong môi trường trình duyệt.

- **Static analysis:** ESM có thể được phân tích tĩnh (static analysis) trong thời gian biên dịch (compile time), cho phép các công cụ tối ưu hóa code (tree-shaking) và phát hiện lỗi sớm hơn.

- **Binding trực tiếp (Live Bindings):** Các import của ESM là các "live bindings" đến các export. Nếu giá trị của biến được export thay đổi trong module gốc, giá trị đó cũng sẽ thay đổi trong module nhập. CommonJS sao chép giá trị.

- **Chế độ Strict Mode mặc định:** ESM luôn chạy ở chế độ strict mode.

- **Không có** `__dirname`, `__filename`**:** Các biến toàn cục này không có sẵn trong ESM. Bạn cần sử dụng `import.meta.url` để lấy đường dẫn hiện tại.

**Cách sử dụng trong Node.js:**

Để sử dụng ES Modules trong Node.js, bạn có hai cách:

1. **Sử dụng đuôi file** `.mjs`: Node.js sẽ tự động coi các file `.mjs` là ES Modules.

2. **Thêm** `"type": "module"` **vào** `package.json`: Khi đó, tất cả các file `.js` trong dự án sẽ được coi là ES Modules (trừ khi có file `.cjs` được chỉ định là CommonJS).

**Cú pháp:**

File: `./utils.mjs` (Module xuất)

```
// utils.mjs (ES Module)

// Named Exports (Xuất có tên)
export const multiply = (a, b) => a * b;
export function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// Default Export (Xuất mặc định - chỉ có một mỗi module)
const PI = 3.14159;
export default PI;
```

File: `./main.mjs` (Module nhập)

```
// main.mjs (ES Module)

// Nhập Named Exports
import { multiply, divide } from './utils.mjs';

// Nhập Default Export (có thể đặt tên bất kỳ)
import myPi from './utils.mjs';

// Nhập tất cả Named Exports dưới dạng một đối tượng
import * as Utils from './utils.mjs';

console.log('ES Modules Examples:');
console.log(`4 * 5 = ${multiply(4, 5)}`); // Output: 4 * 5 = 20
console.log(`10 / 2 = ${divide(10, 2)}`); // Output: 10 / 2 = 5
console.log(`Value of PI: ${myPi}`);    // Output: Value of PI: 3.14159

console.log('Using imported object:', Utils.multiply(6, 6)); // Output: Using imported object: 36

// Ví dụ về import.meta.url (thay thế __dirname, __filename)
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Current file path:', __filename);
console.log('Current directory:', __dirname);
```

### C. Khi nào nên dùng CommonJS hay ES Modules

Việc lựa chọn giữa CommonJS và ES Modules phụ thuộc vào ngữ cảnh và yêu cầu của dự án:

- **Sử dụng ES Modules (ESM) khi:**

  - **Bắt đầu một dự án Node.js mới:** ESM là tiêu chuẩn tương lai của JavaScript và được khuyến nghị cho các dự án mới.

  - **Phát triển các thư viện/package:** ESM cho phép tree-shaking (loại bỏ code không sử dụng) hiệu quả hơn, giúp giảm kích thước bundle cho người dùng cuối.

  - **Code chạy cả trên trình duyệt và Node.js:** ESM là tiêu chuẩn chung, giúp dễ dàng chia sẻ code giữa front-end và back-end.

  - **Cần static analysis và tối ưu hóa:** Các công cụ hiện đại hỗ trợ ESM tốt hơn.

  - **Ưu tiên cú pháp hiện đại và rõ ràng.**

- **Sử dụng CommonJS khi:**

  - **Làm việc với các dự án Node.js cũ:** Nhiều dự án legacy vẫn sử dụng CommonJS. Việc chuyển đổi toàn bộ có thể tốn thời gian và công sức.

  - **Sử dụng các thư viện chỉ hỗ trợ CommonJS:** Mặc dù hầu hết các thư viện lớn đã hỗ trợ ESM, nhưng vẫn có một số thư viện cũ chỉ hoạt động với CommonJS.

  - **Cần hành vi đồng bộ của `require()`:** Trong một số trường hợp rất hiếm, việc tải module đồng bộ có thể cần thiết (mặc dù thường không được khuyến khích).

**Lưu ý quan trọng:**

- Trong một dự án Node.js, bạn có thể trộn lẫn cả hai hệ thống module bằng cách sử dụng các đuôi file `.mjs` cho ES Modules và `.cjs` cho CommonJS, hoặc cấu hình `package.json` với `"type": "module"` và sử dụng `.cjs` cho các file CommonJS.

- Khi sử dụng `"type": "module"` trong `package.json`, bạn sẽ cần sử dụng `import` cho các module CommonJS bằng cách thêm `require()` vào một hàm `createRequire` từ module module của Node.js:

```
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const commonJsModule = require('./path/to/commonjs-module.cjs');
```
