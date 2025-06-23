readFilePromise('file1.txt')
    .then(data1 => {
        // return một Promise mới
        return readFilePromise(data1.trim() + '.txt');
    })
    .then(data2 => {
        console.log('Nội dung file 2:', data2);
        // Có thể tiếp tục nối chuỗi ở đây
    })
    .catch(error => {
        // Bất kỳ lỗi nào trong chuỗi trên đều sẽ được bắt ở đây
        console.error('Có lỗi trong chuỗi Promise:', error);
    });