//const MongoClient = require('mongodb').MongoClient;   
const {MongoClient, ObjectID} = require('mongodb');    


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db) => {
    if(error) 
    {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    
    //deleteMany
    // db.collection('Todos').deleteMany({text : 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text : 'Hello'}).then((result) => {
    //     console.log(result);
    // });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed : true}).then((result) => {
    //     console.log(result);
    // });


    ///////*************/////
    db.collection('Users').deleteMany({name : 'Adil Chowdhury'}).then((result) => {
           console.log(result);
     });

     db.collection('Users').findOneAndDelete({_id : new ObjectID("59e5aaa732164510b0eee20d")}).then((result) => {
            console.log(JSON.stringify(result,undefined,2));
     });


    //db.close();
});