//const MongoClient = require('mongodb').MongoClient;   
const {MongoClient, ObjectID} = require('mongodb');    


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db) => {
    if(error) 
    {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').find({
    //     //completed : false
    //     _id : new ObjectID('59e5a9a23548d31f9c8fcbd7')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // },(error) => {
    //     console.log('unable to fetch todos', error);
    // });
    /////*****////////////

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count : ${count}`);
        
    // },(error) => {
    //     console.log('unable to fetch todos', error);
    // });
//////************//////
    db.collection('Users').find({name : 'Adil'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    
    });
    
   // db.close();
});