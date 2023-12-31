const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' })
const express = require('express')
const app= express()
const User= require('./models/User')

mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('we are connected to mongodb'))
.catch(error => console.log('something happend:', error))

app.get('/', (req,res)=>{
    User.find({}, (err,data)=>{
        if (err) console.error;
        res.json(data)
    })
})

app.post('/', (req,res)=>{
    const newUser = new User({
        name: 'fadwa',
        email: 'f@gmail.com',
        mobile: '0655555555',
        password: 'nothing'
    })
    newUser.save(function(err,data){
        if (err) console.error;
        res.json(data)
    })
})

app.put('/:id', (req,res)=>{
    User.findByIdAndUpdate({_id: req.params.id}, {$set: {mobile: '05222'}}, {new: true}, (err,data)=>{
        if (err) console.error;
        res.json(data)
    })
})

app.delete('/:id', (req,res)=>{
    User.findByIdAndRemove({_id: req.params.id}, (err,data)=>{
        if (err) console.error;
        res.json(data)
    })
})

app.listen(3000, ()=>{
    console.log('Connected to http://localhost:3000')
})