const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/users');
const questionRoute = require('./routes/Question');
const answerRoute = require('./routes/Answer');
const chatBotRoute = require('./routes/Chatbot');
const postRoute = require('./routes/Post');
const subscriptionRoute = require('./routes/Subscription');

const app = express();
const dotenv = require('dotenv');
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hii' });
});

app.use('/user', userRoute);
app.use('/posts', postRoute);

app.use('/questions', questionRoute);

app.use('/answer', answerRoute);

app.use('/chatbot', chatBotRoute);

app.use('/subscription', subscriptionRoute);

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
        app.listen(PORT, () => {
            console.log(`Server is running on port-${PORT}`);
        });
    })
    .catch((err) => console.log(err.message));
