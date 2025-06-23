// Lấy ra phần tử H1 có id là 'greeting'
const greetingElement = document.getElementById('greeting');

// Lấy ra nút bấm có id là 'changeButton'
const changeButton = document.getElementById('changeButton');

// Thêm một trình nghe sự kiện 'click' vào nút bấm
changeButton.addEventListener('click', function() {
    // Khi nút được nhấp, thay đổi nội dung của phần tử H1
    greetingElement.textContent = 'Chào mừng đến với JavaScript!';
});