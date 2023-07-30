const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const MONGOURL = "mongodb+srv://GODFATHER22:h2ooriginal@cluster0.jfmfmt0.mongodb.net/loginDB?retryWrites=true&w=majority"
const portnumber  = 5000
app.use(cors())
//Cluster_Password:h2ooriginal
mongoose.set('strictQuery', true)
mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB has been Connected Successfully!")
}).catch((error)=>{
    console.log("Connection Unsuccessful",error)
})

// registering the model in app.js
require('./models/user')
require('./models/posting')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posting'))

app.listen(portnumber,()=>{
    console.log("Server is Running on",portnumber)
})