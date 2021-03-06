require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const{ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json()); 
app.post('/todos',authenticate, (req,res) => {
    var todo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    });

    todo.save().then((doc) => 
    {
    
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 
app.get('/todos',authenticate, (req,res) => {
    Todo.find({
        _creator : req.user._id
    }).then((todos) => {
        res.send({todos})
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id',authenticate, (req,res) => {

   var id = req.params.id;
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send();
   }
   Todo.findOne({
       _id : id,
       _creator : req.user._id
   }).then((todo) => {
        if(!todo)
        {
            return res.status(404).send();
        }
        res.send({todo});
   }, (error) => {
        res.status(400).send();
   });
});

app.delete('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id : id,
        _creator : req.user._id
    }).then((todo) => {
        if(!todo)
        {
            return res.status(404).send();
        }
        res.send({todo});
   }, (error) => {
        res.status(400).send();
   });
});
app.patch('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime(); 
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({
        _id : id,
        _creator : req.user._id
    } ,{$set: body}, {new: true}).then((todo) => {
        if(!todo)
        {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

/////***User post***////
app.post('/users', (req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    user.save().then(() => {
        //res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});
///****Private route***///

app.get('/users/me',authenticate, (req,res) => {
    res.send(req.user);
});

app.post('/users/login' , (req,res) => {
    var body = _.pick(req.body, ['email','password']);
    User.findByCredentials(body.email,body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token' ,authenticate, (req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});




app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
module.exports = {app};

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

