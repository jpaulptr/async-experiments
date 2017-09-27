const async = require('../data-source/async-promises-scratch');

console.log(
    `--------------------------
-- Running promise written from scratch tests
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
    (number, callOrder) => {
    console.log(`--Promise ordered result:
    seed: 5
    value: ${callOrder}`);
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
      
