const bluebird = require('bluebird');

module.exports = {
    getPromise(key, time) {
        const timeValue = time || key;

        return new Promise((resolve, reject) => {
            const multiplier = parseInt(Math.random() * 17) * timeValue;
            setTimeout(() => {
                resolve(key + key)
            }, multiplier);
        });
    },

    //Basic promise async
    async getData(key, callback, err) {
        return this.getPromise(key);
    },

    //Get chained data. 
    async getDataChained(key) {
        const results = [];

        for (let i = 0; i < key; i++) {
            results.push(
                await this.getPromise(i, key - i)
            );
        }

        return results;
    },

    async getDataParallelOrdered(key) {
        const promises = [];

        for (let i = 0; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        return await bluebird.all(promises);
    },

    async getDataRace(key) {
        const promises = [];

        for (let i = 1; i < key; i++) {
            promises.push(this.getPromise(i));
        }

        return await bluebird.any(promises)
    }
};