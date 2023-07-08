const express = require('express');
const cors = require('cors');
const createConnection = require('./db')
const app = express();
const userRoute = require('./routes/users');
const questionRoute = require('./routes/Question');
const answerRoute = require('./routes/Answer');
const chatBotRoute = require('./routes/Chatbot');
const postRoute = require('./routes/Post');

const dotenv = require('dotenv');
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

// to use the static file
app.use(express.static('public'));

dotenv.config();
createConnection();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.status(200).json({message:'Hii'});
});

app.use('/user',userRoute);
app.use('/posts',postRoute);

app.use('/questions',questionRoute);

app.use('/answer',answerRoute);

app.use('/chatbot',chatBotRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port-${PORT}`);
});