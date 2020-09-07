const mongoose = require('mongoose')
const validate = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tasks = require('../models/tasks')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    phone: {
        type: String,
        validate(value){
            if(!validate.isMobilePhone(value)){
                throw new Error('not a mobile no')
            }
        }
        
    },
    password:{
        type:String,
        required:true,
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//Tasks id 
userSchema.virtual('tasks',{
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})



 
//instance method  --> it is for every instance of a user
userSchema.methods.getAuthTokens = async function(){
    const user = this;
    const token =  jwt.sign({_id: user._id.toString()},'superisupar');

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token;
}


//Another instance method for public data display
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    console.log(userObject)
    delete userObject.password
    delete userObject.tokens

    return userObject
}

//lOGIN  ---> it is for the 'User' model
userSchema.statics.findByCredentials = async (name, password)=>{
   try{
        const user = await User.findOne({name : name})

        if(!user){
            throw new Error('unable to login')
        }

        const passResult = await bcrypt.compare(password,user.password)
        
        if(!passResult){
            throw new Error('unable to login')
        }

        return user
   }catch(e){
       res.send(e)
    }
}


//save the hashed password 
userSchema.pre('save',async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await tasks.deleteMany({owner:user._id})
    next()
})
 

const User = mongoose.model('User',userSchema)

module.exports = User



