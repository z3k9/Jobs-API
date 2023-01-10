const express = require('express');
const app = express();
const notFound = require('./services/notfound');
const v1 = require('./routes/v1');
require('dotenv').config();

app.use(express.json());
app.use('/api/v1', v1);
app.use(notFound);


//routes
app.get('/', (req,res)=>{
    res.send('Jobs API');
});


module.exports = app;