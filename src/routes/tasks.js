const express = require('express')
const tasks = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')


//Create Tasks
router.post('/tasks',auth , async (req,res)=>{
    const task = new tasks({
        ...req.body,
        owner:req.user._id
    })
    
    try{
        await task.save()
        res.send(task)
        
    }catch{
        res.status(400).send(err)
    }
})

//get tasks without id
router.get('/tasks',auth ,async (req,res)=>{
    try{
        const task = await tasks.find({owner: req.user._id})
        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
})


//get tasks by id
router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await tasks.findOne({ _id,owner: req.user._id })
            if(!task){
                return res.status(500).send()
            }

            res.send(task)
    }catch{
        res.status(404).send()
    }

})


//Update tasks
router.patch('/tasks/:id',auth, async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['task','complete']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        const task = await tasks.findOne({_id:req.params.id,owner:req.user._id})
        //const task = await tasks.findById(req.params.id)
        
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)

    }catch(e){
        res.status(400).send()
    }
})

//Delete Tasks
router.delete('/tasks/:id',auth , async (req,res)=>{
    try{
        const task = await tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id}) 
        console.log(task) 

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    
    }catch(e){
        res.status(404).send()
    }
})

module.exports = router