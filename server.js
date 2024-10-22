const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const courseRouter = require('./routes/courseRouter');
const videoRouter = require('./routes/videoRoutes');
const commentRouter = require('./routes/commentRoutes');

require('dotenv').config()

const app = express();

// connect to DB
mongoose.connect('mongodb://localhost:27017/Task_7').then(() => {
    console.log('successfully connected');
}).catch(err => console.error(`Error connecting to Mongo: ${err}`))

app.use(express.json());

app.use('/api', registerRoutes)
app.use('/api/users', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/video', videoRouter)
app.use('/api/comment', commentRouter)

// run the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})