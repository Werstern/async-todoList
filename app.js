const express = require('express');
const path = require('path');
const todoController = require('./controllers/todoController');

const app = express();

//set up template engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//static files
app.use(express.static(path.join(__dirname, "public")));

//fire controllers
todoController(app);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//listen to port
app.listen(3000, function() {
    console.log('Listening on http://localhost:3000');
});
