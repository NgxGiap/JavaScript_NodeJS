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