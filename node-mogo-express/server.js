const express = require('express');
const mongoose = require('mongoose');
const config = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/index')
const errorMiddleware = require('./midllewares/error-midleware')
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server listen ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()