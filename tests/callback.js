const async = require('../data-source/async-callbacks');

console.log(
`--------------------------
-- Running callback tests
--------------------------`);

async.getData(1, (value) => {
    console.log(`--Simple callback result:
    seed: 1
    value: ${value}`);
});

async.getDataChained(5, (err, number) => {
    console.log(`--Chained callback result:
    seed: 5
    value: ${number}`);
});


async.getDataParallel(5, true, (err, number) => {
    console.log(`--Parallel ordered callback result:
    seed: 5
    value: ${number}`);
});


async.getDataParallel(5, false, (err, number) => {
    console.log(`--Parallel unordered callback result:
    seed: 5
    value: ${number}`);
});

async.getDataRace(5,  (err, number) => {
    console.log(`--race callback result:
    seed: 5
    value: ${number}`);
});
