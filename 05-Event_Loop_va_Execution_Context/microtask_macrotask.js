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