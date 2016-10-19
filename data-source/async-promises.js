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

  }
};