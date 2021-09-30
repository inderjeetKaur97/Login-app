

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/portfolioSite', 
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("node connected to mongoDB")
}).catch((err)=>{
    console.log(`Not connected to db :${err}`)
})