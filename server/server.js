const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json()); 
app.post('/todos', (req,res) => {
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((doc) => 
    {
    
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 
app.listen(3000, () => {
    console.log('Started on port 3000');
});

// var Todo = mongoose.model('Todo', {
//     text: {
//         type : String,
//         required : true,
//         minlength : 1,
//         trim : true

//     },
//     completed: {
//         type : Boolean,
//         default : false
//     },
//     completedAt: {
//         type : Number,
//         default : null
//     }
// });

// var newTodo = new Todo({
//     text : 'Cook dinner'
// });
// newTodo.save().then((doc) => {
//     console.log('Saved 1st Todo');
//     console.log(JSON.stringify(doc,undefined,2));
// }, (e) => {
//     console.log('unable to save Todo')
// });  

// var secondTodo = new Todo({
//     text : 'Mongoose is moja',


//     completed : true,


//     completedAt : 888
// });
// secondTodo.save().then((doc) => {
//     console.log('Saved 2nd Todo';
//     console.log(JSON.stringify(doc,undefined,2));
// }, (e) => {
//     console.log(`unable to save secondTodo`)
// });


// var testingTodo = new Todo({
//     text : 'Hi '
// });
// testingTodo.save().then((doc) => {
//     console.log('Saved testing Todo');
//     console.log(JSON.stringify(doc,undefined,2));
// }, (e) => {
//     console.log(`unable to save secondTodo`);
// });



///Task////

// var User = mongoose.model('User', {
//     email: {
//         type : String,
//         required : true,
//         minlength : 1,
//         trim : true
//     }
// });

// var task = new User({
//     email : 'adil.aj95@gmail.com         '
// });
// task.save().then((doc) => {
//     console.log(JSON.stringify(doc,undefined,2));
// }, (e) => {
//     console.log(`unable to save secondTodo`);
// });
