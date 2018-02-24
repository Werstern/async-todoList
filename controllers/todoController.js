const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect ot database
mongoose.connect('mongodb://test:test@ds143388.mlab.com:43388/todolist');

//Create a schema
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

app.get('/todo', (req, res) => {
    //get data from mongodb ana pass it to view
    Todo.find({}, (err, data) => {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser, (req, res) => {
    //get data from view and add it to mongodb
    const newTodo = Todo(req.body).save((err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item', (req, res) => {
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

};
