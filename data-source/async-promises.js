const bluebird = require('bluebird');



module.exports = {

  getPromise(key) {

    
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(key), Math.floor(100 * key * Math.random()));
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
    //const results = [];

    for (let i = 0; i < key; i++) {
      promises.push(this.getPromise(i));
    }

    bluebird.mapSeries(promises, (value) => {
      return value;
    }).then((val) => {
      callback(val);
    });

  },

  getDataParallelOrdered(key, callback, err) {

    const promises = [];

    for (let i = 0; i < key; i++) {
      promises.push(this.getPromise(i));
    }

    bluebird.all(promises)
      .then((val) => {

        const results = [];

        for (let i = 0; i < val.length; i++) {
          results.push(val[i]);
        }

        callback(results);
      });

  },

  getDataParallelUnordered(key, callback, err) {

    const promises = [];
    const callOrder = [];

    for (let i = 0; i < key; i++) {
      promises.push(this.getPromise(i));
    }

    bluebird.map(promises, (value) => {
      callOrder.push(value);
      return value;
    }).then((val) => {
      callback(val, callOrder);
    });
  },

  getDataRace(key, callback, err) {

    const promises = [];

    for (let i = 1; i < key; i++) {
      promises.push(this.getPromise(i));
    }

    bluebird.any(promises)
      .then((val) => {        
        callback(val);
      });
  }

};