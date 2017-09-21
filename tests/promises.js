const async = require('../data-source/async-promises');

console.log(
    `--------------------------
-- Running promise tests
--------------------------`);

async.getData(1, (result) => {
    console.log(`--Simple promise:
    seed: 1
    value: ${result}`);
});

async.getDataChained(5, (number) => {
    console.log(`--Promise chained result:
    seed: 5
    value: ${number}`);
});

async.getDataParallelOrdered(5,
    (number) => {
    console.log(`--Promise parallel ordered result:
    seed: 5
    value: ${number}`);
    });

async.getDataParallelUnordered(5,
    (number) => {
    console.log(`--Promise parallel unordered result:
    seed: 5
    value: ${number}`);
    });    

async.getDataRace(5, (number) => {
    console.log(`--Promise race result:
    seed: 5
    value: ${number}`);
});
      

/*
    
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

    */
