const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'));


module.exports = {

  getPromise(key) {
    return request.getAsync(
      {
        url: `http://localhost:3000/promise-mock/basic/${key}`
      });
  },

  //Basic promise async
  getData(key, callback, err) {

    this.getPromise(key).then((response) => {
      callback(response);
    }).catch((error) => {
      err(error);
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
      const result = JSON.parse(value.body);
      //results.push(result.value);
      return result.value;
    }).then((val) => {
      //callback(results);
      callback(val);
    });

  },

  //Is this really parrallel?
  getDataParallelOrdered(key, callback, err) {

    const promises = [];

    for (let i = 0; i < key; i++) {
      promises.push(this.getPromise(i));
    }

    bluebird.all(promises)
      .then((val) => {

        const results = [];

        for (let i = 0; i < val.length; i++) {
          let parsed = JSON.parse(val[i].body);
          results.push(parsed.value);
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
      const result = JSON.parse(value.body);
      callOrder.push(result.value);
      return result.value;
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

        let parsed = JSON.parse(val.body);
        callback(parsed.value);
        
      });
  }

};