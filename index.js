const express = require('express');
const app = express();
const promise = require('./promise');
const callback = require('./callback');

app.use('/callback', callback);
app.use('/promise', promise);

app.listen(3000, ()=>{
    console.log('listening')
});