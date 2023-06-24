const mongoose = require('mongoose');

const createConnection = ()=>{
    mongoose.connect(process.env.URL,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to database'))
    .catch((err)=>console.log(err.message));
}

module.exports = createConnection