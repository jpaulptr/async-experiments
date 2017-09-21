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
    (number, callOrder) => {
    console.log(`--Promise parallel unordered result:
    seed: 5
    value: ${callOrder}`);
    });    

async.getDataRace(5, (number) => {
    console.log(`--Promise race result:
    seed: 5
    value: ${number}`);
});
      
