const bluebird = require('bluebird');

module.exports = {

  //Basic call call back async
  getData: (key, callback) => {

    setTimeout(() => {
      callback(key + key);
    }, key * 100);
  },

  //Get chained data. 
  //Each request has to finish before it will return
  getDataChained: function (key, callback) {

    //array of functions to call in a chanined manner
    const funcs = [];
    const that = this;

    for (let i = 0; i < key; i++) {

      (function () {
        //partial applying the key, not necessary
        funcs.push(that.getData.bind(undefined, i + 1));
      })();
    }
   
    chainedRunner(funcs, callback);
  },

  getData2: (key) => {
    return bluebird.try(() => {
      sleep(1000);
      return key;
    });

  },

  getData3: (key) => {
    return bluebird.try(() => {
      sleep(1000);
      return 'done';
    });

  }

};




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//Run chained requests. 
//Takes an array of functions that each take a value parameter, which is the result of the previous method
//and takes a callback to call at end of the chain
const chainedRunner = (funcs, callback) => {

  //results store
  const results = [];
  //index of current iteration
  let index = 0;

  //wrap the callback and itterate thorugh the list of functions in order
  const wrapper = (value) => {

    index++;
    results.push(value);
   
    if (index < funcs.length) {
      funcs[index](wrapper);
    } else {
      //When you get to the end of the array of functions, call the orginal callback
      callback(null, results);
    }
  };

  //start the initial call
  funcs[index](wrapper);
};