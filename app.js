const express = require("express");
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");

PORT=5000

const {MONGOURI} = require("./keys");

require('./models/user')
require('./models/post')

app.use(cors())
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


mongoose.connect(MONGOURI);
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongoose");
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err);
})


app.listen(PORT,()=>{
    console.log("server running on port",PORT);
})
