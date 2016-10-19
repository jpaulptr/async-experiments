const express = require('express');
const router = express.Router();
const async = require('./data-source/async-promises');


router.use((req, res, next) => {
    res.set({
        'Content-Type': 'application/json'
    });

    next();
});

router.get('/basic/:key', (req, res, err) => {
    const key = parseInt(req.params['key']);
    const multiplier = parseInt(Math.random() * 10) * key;

    setTimeout(() => {
        res.send(
            {
                value: `${key + key}`
            });
    }, multiplier * 50);

});

module.exports = router;