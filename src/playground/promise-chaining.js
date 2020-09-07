require('../db/mongoose')
const User = require('../models/user');

User.findByIdAndDelete('5f0ff91ccd5062296827eaa8').
then((user)=>{
    console.log(user);
    return User.countDocuments({completed:false})
}).then(result=>console.log(result));

