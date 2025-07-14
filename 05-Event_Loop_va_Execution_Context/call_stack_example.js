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