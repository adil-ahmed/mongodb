const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59e8d4bdc380ec17a07f9e3c11';
// if(!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({ 
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo)
//     {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((error) => {
//     console.log(error);

// });


////////********Task ******/

User.findById('59e77c002efba50514a94d13').then((user) => {
    if(!user)
    {
      return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));

},(e) => {
    console.log(e);
});