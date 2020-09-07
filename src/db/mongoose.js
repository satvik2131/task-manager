const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017',{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})



// const us1 = new users({
//     name:'Satvik',
//     phone: "+917987205435"
// })

// us1.save().then(()=>{
//     console.log(us1)
// }).catch((error)=>{
//     console.log(error)
// })