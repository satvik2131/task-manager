const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const jwt = require('jsonwebtoken')


router.post('/users/Create',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.getAuthTokens()

        res.status(201).send({ user, token })

    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.name, req.body.password)
        const token = await user.getAuthTokens()
        res.send({ user: user.toJSON(), token })
    }catch(e){
        res.status(400).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.post('/users/logout' , auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        
        res.send()
    }catch(e){
        res.status(500).send()
    }

})

router.post('/users/logoutAll' , auth, async (req,res)=>{
    try{
        req.user.tokens = []

        await req.user.save()
        res.send()

    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})



router.delete('/users/me',auth , async (req,res)=>{
    try{
        
        await req.user.remove()
        res.send(req.user)
    
    }catch(e){
        res.status(404).send()
    }
})


router.patch('/users/me',auth ,async (req,res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','phone','password']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    try{

        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(e){
        res.status(400).send()
    }
})

module.exports = router