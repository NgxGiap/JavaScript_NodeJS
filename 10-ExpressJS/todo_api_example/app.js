const express = require('express');
const app = express();
const port = 3000;

// Middleware để parse body của request từ dạng JSON sang object
app.use(express.json());

// --- Dữ liệu giả lập (in-memory database) ---
let todos = [
    { id: 1, task: 'Học Node.js', completed: false },
    { id: 2, task: 'Làm bài tập Express', completed: true },
    { id: 3, task: 'Chuẩn bị cho buổi phỏng vấn', completed: false }
];
let currentId = 4;

// --- Routes ---

// GET / - Trang chủ
app.get('/', (req, res) => {
    res.send('Chào mừng đến với API To-Do List!');
});

// GET /todos - Lấy về tất cả các công việc
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// GET /todos/:id - Lấy về một công việc theo ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Không tìm thấy công việc này!' });
    }
});

// POST /todos - Tạo một công việc mới
app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({ message: 'Thuộc tính "task" là bắt buộc.' });
    }

    const newTodo = {
        id: currentId++,
        task: task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Cập nhật một công việc
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, completed } = req.body;
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex !== -1) {
        if (task === undefined || completed === undefined) {
            return res.status(400).json({ message: 'Cần cung cấp cả "task" và "completed".' });
        }
        todos[todoIndex].task = task;
        todos[todoIndex].completed = completed;
        res.status(200).json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Không tìm thấy công việc này!' });
    }
});

// DELETE /todos/:id - Xóa một công việc
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Không tìm thấy công việc này!' });
    }
});

// --- Khởi động server ---
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});