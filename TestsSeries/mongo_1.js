
const mongodb = require('mongodb');
const url= 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const ObjectID = mongodb.ObjectID;

mongodb.MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('could not connect');
    }

    const db = client.db(databaseName)
    db.collection('userdetails').deleteOne({
        _id : new ObjectID("5ee9bfa8f37c4215b41a899c")
    }).then(res=>{console.log(res);
    })


    // const db = client.db(databaseName)
    // db.collection('userdetails').updateMany(
    //     {_id : new ObjectID("5ee9bfa8f37c4215b41a899c")},
    //         {
    //         $set:{
    //             name:'Jin Yang'
    //         }
    //     },
    //     {
    //         $inc:{
    //             age:1
    //         }
    //     }
    // ).then(result=>{
    //     console.log(result);  
    // }).catch((error)=>{
    //     console.log(error);
        
    // })

    // const db = client.db(databaseName)
    // db.collection('tasks').find({completed:false}).toArray((error,task)=>{
    //     if(error){
    //         return console.log('cannot connect')
    //     }
        
    //     console.log(task);
        
    // });


    
    // const db = client.db(databaseName)
    // db.collection('userdetails').findOne({
    //     name:'satvik'
    // },
    
    // (error,user)=>{
    //     if(error){
    //         return console.log('could not find');
    //     }

    //     console.log(user);
    // })

    // const db = client.db(databaseName);
    // db.collection('userdetails').insertMany([
    //     {
    //         name:'satvik',
    //         age:21
    //     },{
    //         name:'Aang',
    //         age: 100
    //     },{
    //         name:'vikram',
    //         age:43
    //     }
    // ],
    
    // (error,result)=>{
    //     if(error){
    //         return console.log('could not connect')
    //     }
        
    //     console.log(result.ops);
        
    // })
    
    
})

