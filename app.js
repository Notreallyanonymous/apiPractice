const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newtask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newtask);
    res.status(201).json(newtask);  // Changed req.status to res.status
});

app.get('/tasks/:id', (req, res) => {
    const taskid = parseInt(req.params.id);  // Corrected :id in the path
    const task = tasks.find(t => t.id === taskid);  // Corrected task.find to tasks.find
    if (task) {
        res.json(task);  // Corrected res.join() to res.json(task)
    } else {
        res.status(404).send('No se encontró la tarea');  // Corrected typo in Spanish
    }
});

app.put('/tasks/:id', (req, res) => {
    const taskid = parseInt(req.params.id);  
    const task = tasks.find(t => t.id === taskid);
    if (task) {
        task.title = req.body.title || task.title;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;  // Corrected tasks.completed to task.completed
        res.json(task); 
    } else {
        res.status(404).send('No se actualizó la tarea');  
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskid = parseInt(req.params.id);  
    const taskIndex = tasks.findIndex(t => t.id === taskid);  
    if (taskIndex !== -1) {  
        tasks.splice(taskIndex, 1);
        res.status(204).send('Registro eliminado');
    } else {
        res.status(404).send("No se eliminó la tarea");  
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en la URL http://localhost:${port}`);  
});
