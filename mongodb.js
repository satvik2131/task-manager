
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'



MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true },(error,client)=>{
    if(error){
        return 'could not connect'
    }

    const db = client.db(dataBaseName)

    db.collection('user').insertOne({
        name : 'satvik',
        age : 19
    })

    const db = client.db(dataBaseName)

    db.collection('tasks').insertMany([
        {
            task: 'eating',
            completed : true
        },{
            task: 'coding',
            completed : true
        },{
            task: 'diving',
            completed: false
        }
    ],

    (error,results)=>{
        if(error){
            return console.log('could not connect')
        }

        console.log(results.ops)
        
    })
})