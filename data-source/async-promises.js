const bluebird = require('bluebird');



module.exports = {

  getPromise(key, time) {
    const timeValue = time || key;
    
    return new Promise((resolve, reject) => {
      const multiplier = parseInt(Math.random() * 10) * timeValue;
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
        callback(val);
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