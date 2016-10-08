const express = require('express');
const router = express.Router();
const async = require('./data-source/async-callbacks');

//Do a basic callback request
router.get('/basic', (req, res, err) => {

    async.getData(1, (err, value) => {
        res.send(`callback-basic: ${value}`);
    });

});

router.get('/chained/:number', (req, res, err) => {

    if (!isValidRequest(req, 'number')) {
        res.send(`callback-chained invalid request parameter`);
    }
    else {
        async.getDataChained(req.params['number'], (err, number) => {
            res.send(`callback-chained ${number}`);
        });
    }
});


router.get('/parallel/:number', (req, res, err) => {

    if (!isValidRequest(req, 'number')) {
        res.send(`callback-parallel invalid request parameter`);
    }
    else {
        async.getDataParallel(req.params['number'], true, (err, number) => {
            res.send(`callback-parallel ordered results ${number}`);
        });
    }

});

router.get('/parallel-unordered/:number', (req, res, err) => {

    if (!isValidRequest(req, 'number')) {
        res.send(`callback-parallel invalid request parameter`);
    }
    else {
        async.getDataParallel(req.params['number'], false, (err, number) => {
            res.send(`callback-parallel unordered resuts ${number}`);
        });
    }

});

router.get('/race/:number', (req,res,err)=>{
    if (!isValidRequest(req, 'number')) {
        res.send(`callback-race invalid request parameter`);
    }
    else {
        async.getDataRace(req.params['number'],  (err, number) => {
            res.send(`callback-race resuts ${number}`);
        });
    }
});

const isValidRequest = (req, number) => {
    if (!req.params['number']
        || isNaN(parseInt(req.params['number']))
        || parseInt(req.params['number']) < 1
    ) {
        return false;
    }

    return true;
}

module.exports = router;