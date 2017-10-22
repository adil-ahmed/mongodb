const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Does not return anything and remove everything inside Todo
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Does return a object after removing
Todo.findOneAndRemove({_id : '59ecb388c698b8823d944db5'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove('59ecb28bc698b8823d944cbf').then((todo) => {
//     console.log(todo);
// });