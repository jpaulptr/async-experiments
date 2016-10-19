const express = require('express');
const app = express();
const promise = require('./promise');
const promiseMock = require('./promise-mock');
const callback = require('./callback');

app.use('/callback', callback);
app.use('/promise-mock', promiseMock);
app.use('/promise', promise);

app.listen(3000, ()=>{
    console.log('listening')
});