4. So sánh và Toán tử
So sánh: == vs === (Equality Operators)
Đây là một trong những câu hỏi phỏng vấn kinh điển nhất về JavaScript để kiểm tra xem ứng viên có thực sự hiểu về cách ngôn ngữ này hoạt động hay không.

A. === (Toán tử so sánh bằng nghiêm ngặt - Strict Equality)

Hoạt động: So sánh cả giá trị (value) và kiểu dữ liệu (type) của hai vế. Nó sẽ chỉ trả về true nếu cả hai vế hoàn toàn giống nhau.
Không thực hiện chuyển đổi kiểu (Type Coercion): Đây là điểm mấu chốt. === không cố gắng "biến đổi" kiểu dữ liệu của một vế để khớp với vế còn lại.
Lời khuyên: Luôn luôn ưu tiên sử dụng === trong code của bạn. Nó an toàn hơn, dễ đoán hơn và tránh được nhiều lỗi ngầm. Chỉ sử dụng == khi bạn có lý do rất cụ thể để làm vậy (điều này rất hiếm).

B. == (Toán tử so sánh bằng lỏng lẻo - Loose Equality)

Hoạt động: Chỉ so sánh giá trị (value) sau khi đã thực hiện chuyển đổi kiểu (Type Coercion) nếu cần thiết. Nó cố gắng đưa hai vế về cùng một kiểu dữ liệu trước khi so sánh.
Quy tắc chuyển đổi kiểu phức tạp: Các quy tắc mà == tuân theo có thể khá phức tạp và khó nhớ, dễ dẫn đến những kết quả không mong muốn.
./equality_operators.js

C. Các toán tử logic và toán tử liên quan
Đây là những toán tử dùng để kết hợp hoặc đảo ngược các biểu thức logic (thường là true/false).

I. && (Logic AND)

Ý nghĩa: Trả về true nếu cả hai vế đều là true.
Hành vi "Short-Circuiting": Nếu vế bên trái là false (hoặc một giá trị "falsy" như 0, "", null, undefined), nó sẽ ngay lập tức trả về giá trị của vế trái mà không cần kiểm tra vế phải.
Ứng dụng:
Kiểm tra nhiều điều kiện cùng lúc.
Thực thi có điều kiện một cách ngắn gọn.

II. || (Logic OR)

Ý nghĩa: Trả về true nếu ít nhất một trong hai vế là true.
Hành vi "Short-Circuiting": Nếu vế bên trái là true (hoặc một giá trị "truthy"), nó sẽ ngay lập tức trả về giá trị của vế trái mà không cần kiểm tra vế phải.
Ứng dụng:
Cung cấp giá trị mặc định/dự phòng (trước khi có ??).

III. ! (Logic NOT)

Ý nghĩa: Đảo ngược giá trị boolean của một biểu thức. Biến true thành false và ngược lại. Nó luôn trả về true hoặc false.
!! (Double NOT): Một mẹo để chuyển đổi bất kỳ giá trị nào thành dạng boolean tường minh của nó (true hoặc false).

IV. ?? (Nullish Coalescing Operator - Toán tử kết hợp Null)

Được giới thiệu trong ES2020.
Ý nghĩa: Đây là một phiên bản "thông minh hơn" của ||. Nó chỉ trả về vế phải khi vế trái là null hoặc undefined. Nó không coi các giá trị falsy khác như 0, '' (chuỗi rỗng), hoặc false là "nullish".
Tại sao nó hữu ích? Để giải quyết trường hợp khi 0 hoặc chuỗi rỗng là những giá trị hợp lệ mà bạn muốn giữ lại.

V. ?: (Ternary Operator - Toán tử ba ngôi)

Ý nghĩa: Là một cách viết tắt cho câu lệnh if...else.
Cú pháp: condition ? expressionIfTrue : expressionIfFalse
./logical_operators.js