const bluebird = require('bluebird');



module.exports = {

    getPromise(key, time) {
        const timeValue = time || key;

        return new Promise((resolve, reject) => {
            const multiplier = parseInt(Math.random() * 17) * timeValue;
            setTimeout(() => resolve(key + key), multiplier);
        });
    },

    //Basic promise async
    getData(key, callback, err) {

        this.getPromise(key).then((response) => {
            callback(response);
        });
    },

    //Get chained data. 
    //Each request has to finish before it will return
    getDataChained(key, callback, err) {
        const promises = [];

        for (let i = 0; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        this.chainedRunner(promises).then((val) => {
            callback(val);
        })
    },

    chainedRunner(promises) {
        let total = [];
        let count = 0;

        const runner = () => {
            if (count < promises.length) {
                return promises[count++].then((result) => {
                    total.push(result);
                    return runner();
                })
            }

            return total;
        }

        return runner();
    },


    getDataParallelUnordered(key, callback, err) {

        const promises = [];

        for (let i = 0; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        this.parallelRunner(promises)
            .then((val) => {
                callback(val);
            });

    },

    parallelRunner(promises) {
        const result = [];
        let completed = 0;

        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(val => {
                    result.push(val);
                    completed++;

                    if (completed === promises.length) {
                        resolve(result);
                    }
                })
            }
        })
    },

    getDataParallelOrdered(key, callback, err) {

        const promises = [];
        const callOrder = [];

        for (let i = 0; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        this.parallelOrderedRunner(promises)
            .then((val) => {
                callback(val, val);
            });
    },

    parallelOrderedRunner(promises) {
        const result = [];
        let completed = 0;

        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(val => {
                    result[i] = val;
                    completed++;

                    if (completed === promises.length) {
                        resolve(result);
                    }
                })
            }
        })
    },

    getDataRace(key, callback, err) {

        const promises = [];

        for (let i = 1; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        this.raceRunner(promises)
            .then((val) => {
                callback(val);
            });
    },
    raceRunner(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(val => {
                    resolve(val);
                })
            }
        })
    }


};