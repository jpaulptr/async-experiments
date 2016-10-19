const bluebird = require('bluebird');

module.exports = {

  //Basic call back async
  getData: (key, callback) => {

    const multiplier = parseInt(Math.random() * 10) * key;

    setTimeout(() => {
      callback(key + key);
    }, multiplier * 50);
  },

  //Get chained data. 
  //Each request has to finish before it will return
  getDataChained: function (key, callback) {
    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    chainedRunner(funcs, callback);
  },


  getDataParallel: function (key, ordered, callback) {
    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    parallelRunner(funcs, ordered, callback);
  },

  getDataRace: function (key, callback) {

    const funcs = [];

    for (let i = 0; i < key; i++) {
      funcs.push(this.getData.bind(undefined, i + 1));
    }

    raceRunner(funcs, callback);
  }

};

// Return the first item that completes
const raceRunner = (funcs, callback) => {

  let hasEnded = false;

  const wrapper = (value) => {

    //Only call the callback one time, otherwise let all other silently finish.
    if (!hasEnded) {
      callback(null, value);
      hasEnded = true;
    }
  }

  //call the functions
  for (let i = 0; i < funcs.length; i++) {
    funcs[i](wrapper);
  }
};


//Run parallel requests
//Takes an array of functions that each take a value parameter, which is the result of the previous method
//takes a boolean to determine if the result array should be in the same order as the functions in the funcs array
//takes a callback to call at end of the chain
const parallelRunner = (funcs, ordered, callback) => {
  //results store
  const results = [];
  //index of current iteration
  let countOfAddedItems = 0;

  //wrap the callback and add to the result array as the values are returned
  const wrapper = (index, value) => {

    if (index === null) {
      //unordered results
      results.push(value);
      countOfAddedItems++;
    } else {
      //ordered results
      results[index] = value;
      countOfAddedItems++;
    }

    if (countOfAddedItems === funcs.length) {
      callback(null, results);
    }
  };

  //call the functions
  for (let i = 0; i < funcs.length; i++) {
    funcs[i](wrapper.bind(null, ordered ? i : null));
  }

};


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