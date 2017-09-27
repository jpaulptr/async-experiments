const async = require('../data-source/async-await');

console.log(
    `--------------------------
-- Running promise tests
--------------------------`);

async.getData(1).then((result) => {
    console.log(`--Simple promise:
    seed: 1
    value: ${result}`);
});

async.getDataChained(5).then((number) => {
    console.log(`--Async await chained result:
    seed: 5
    value: ${number}`);
});

async.getDataParallelOrdered(5).then((number) => {
    console.log(`--Async await parallel ordered result:
    seed: 5
    value: ${number}`);
    });

async.getDataRace(5).then((number) => {
    console.log(`--Promise race result:
    seed: 5
    value: ${number}`);
});
      
