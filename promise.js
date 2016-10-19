const express = require('express');
const router = express.Router();
const async = require('./data-source/async-promises');

router.get('/basic', (req, res, err) => {

    async.getData(1, (key) => {
        const result = JSON.parse(key.body);
        res.send(`promise-chained ${result.value}`);

    }, (err) => {
        console.log(err);
        res.send(err)
    });
});

router.get('/chained/:number', (req, res, err) => {

    async.getDataChained(req.params['number'],
        (value) => {           
            res.send(`promise-chained ${value}`);
        },
        (err) => {
            console.log(err);
            res.send(err)
        });
});


router.get('/parallel/:number', (req, res, err) => {

    async.getDataParallelOrdered(req.params['number'],
        (value) => {           
            res.send(`promise-parallel ${value}`);
        },
        (err) => {
            console.log(err);
            res.send(err)
        });
});

router.get('/parallel-ordered/:number', (req, res, err) => {

    async.getDataParallelUnordered(req.params['number'],
        (value, callorder) => {           
            res.send(`promise-parallel-ordered ${value} | call return order: ${callorder}`);
        },
        (err) => {
            console.log(err);
            res.send(err)
        });
});

router.get('/race/:number', (req, res, err) => {

    async.getDataRace(req.params['number'],
        (value) => {           
            res.send(`promise-race ${value}`);
        },
        (err) => {
            console.log(err);
            res.send(err)
        });
});

module.exports = router;