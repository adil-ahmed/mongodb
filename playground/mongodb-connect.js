//const MongoClient = require('mongodb').MongoClient;   
const {MongoClient, ObjectID} = require('mongodb');    
// var obj = new ObjectID();
// console.log(obj);

// var user = {name : 'Adil',age : 23};
// var {age} = user;
// console.log(age);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db) => {
    if(error) 
    {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').insertOne({
    //     text : 'Something to do',
    //     completed : false
    // }, (error,result) => {
    //     if(error)
    //     {
    //         return console.log('Unable to insert error' , error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name : 'Adil Chowdhury',
    //     age : 23,
    //     location : 'Sylhet',
    // }, (error,result) => {
    //     if(error) 
    //     {
    //         return console.log('Unable to insert user info', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});