require('../db/mongoose')
const User = require('../models/user');


//Delete the task and count

const updateTaskAndDel = async (id)=>{
    const user = await User.findByIdAndDelete(id,{id})
    const count = await User.countDocuments({id})
    return count
}

updateTaskAndDel('5f131999b7120004b83d5ad2')
.then(count=>{console.log(count)})
.catch((e)=>{console.log(e)})