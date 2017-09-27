const async = require('../data-source/async-async');

console.log(
`--------------------------
-- Running async js  tests
--------------------------`);

async.getData(1, (err, value) => {
    console.log(`--Simple async js result:
    seed: 1
    value: ${value}`);
});

async.getDataChained(5, (err, number) => {
    console.log(`--Chained async js result:
    seed: 5
    value: ${number}`);
});

async.getDataParallel(5, (err, number) => {
    console.log(`--Parallel ordered async js  result:
    seed: 5
    value: ${number}`);
});

async.getDataRace(5,  (err, number) => {
    console.log(`--race async js  result:
    seed: 5
    value: ${number}`);
});
