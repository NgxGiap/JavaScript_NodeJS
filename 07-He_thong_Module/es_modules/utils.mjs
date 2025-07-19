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