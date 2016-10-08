const express = require('express');
const router = express.Router();
const async = require('./data-source/async-promises');

// router.get('/basic', (req, res, err)=>{

//     async.getData(1, (key)=>{
//         res.send(`test ${key}`);
//     });

// });

// router.get('/chained', (req, res, err)=>{

//     async.getData2(1).then(()=>{
//         return async.getData3(1);
//     }).then((val)=>{
//         res.send('test2' + val);
//     })       
    
// });


// router.get('/check3', (req, res, err)=>{

//     async.getData2(1).then(()=>{
//         return async.getData3(1);
//     }).then((val)=>{
//         res.send('test2' + val);
//     })       
    
// });

module.exports = router;