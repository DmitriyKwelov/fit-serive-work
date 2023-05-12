require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const router = require('./router/index')
const path = require('path')

const PORT = process.env.PORT || 5000;
const app = express()

mongoose.set('strictQuery', false);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser({
    secret: 'yourSecret',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
}));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://87.236.16.59', 'https://fit-work.store', 'http://fit-work.store'],
    credentials: true,
}));
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started on ${PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}

start();