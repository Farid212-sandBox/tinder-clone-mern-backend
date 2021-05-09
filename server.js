import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cards from './dbCards.js'

// App config
const app = express()
const port = process.env.PORT || 8001
const connect_url = `mongodb+srv://admin:eEE1jWeEvQC4fNMw@cluster0.0m4vr.mongodb.net/tinder-db?retryWrites=true&w=majority`

// Middlewares
app.use(express.json())
app.use(cors())

// DB config
mongoose.connect(connect_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// API Endpoints
app.get('/', (req, res)=>res.status(200).send('Hello World'))

app.post('/tinder/cards', (req, res)=>{
    const dbCrad = req.body
    
    Cards.create(dbCrad, (err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res)=>{    
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, ()=>console.log(`running server on port: ${port}`))