//const MongoClient = require('mongodb').MongoClient;   
const {MongoClient, ObjectID} = require('mongodb');    


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db) => {
    if(error) 
    {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
     db.collection('Users').findOneAndUpdate({
         _id : new ObjectID('59e766e2e0455e12b444af09')
     },{
         $set: {
             location : 'Chowhatta,Sylhet'
         },
     }, {
         returnOriginal : false
     }).then((result) => {
         console.log(result);
     });

     db.collection('Users').findOneAndUpdate({
        _id : new ObjectID('59e766e2e0455e12b444af09')
    },{
        $inc: {
            age : 1
        },
    }, {
        returnOriginal : false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});