const async = require('async');

module.exports = {

  //Basic call back async
  getData: (key, callback) => {
    const multiplier = parseInt(Math.random() * 10);
    
    setTimeout(() => {
      // Important
      callback(null, key + key);
    }, multiplier * 200);
  },

  getDataChained: function (key, callback) {
    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    async.series(funcs, callback);
  },

  getDataParallel: function (key, callback) {
    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    async.parallel(funcs, callback);
  },

  getDataRace: function (key, callback) {
    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    async.race(funcs, callback);
  }
};
