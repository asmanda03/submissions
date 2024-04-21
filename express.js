const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }


  let result = {
    operation: "mean",
    result: findMean(nums)
  }

  return res.send(result);
});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums)
  }

  return res.send(result);
  
});

app.get('/mode', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums)
  }

  return res.send(result);

 
});

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});
////////////////////////////////////////////////////////////////////////////////////////////////


/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
  }
  
  
  module.exports = ExpressError;
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */
function createFrequencyCounter(arr) {
    return arr.reduce(function(acc, next) {
      acc[next] = (acc[next] || 0) + 1;
      return acc;
    }, {});
  }
  
  /**
   * Find the most common element in the array
   * @param {Array} arr any array
   */
  function findMode(arr) {
    let freqCounter = createFrequencyCounter(arr);
  
    let count = 0;
    let mostFrequent;
  
    for (let key in freqCounter) {
      if (freqCounter[key] > count) {
        mostFrequent = key;
        count = freqCounter[key];
      }
    }
  
    return +mostFrequent;
  }
  
  /**
   * Attempt to convert an array of strings to an array of numbers
   * @param {Array} numsAsStrings array of strings
   * @returns {Array|Error} an array or an error object
   */
  function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
  
    for (let i = 0; i < numsAsStrings.length; i++) {
      let valToNumber = Number(numsAsStrings[i]);
  
      if (Number.isNaN(valToNumber)) {
        return new Error(
          `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
        );
      }
  
      result.push(valToNumber);
    }
    return result;
  }
  
  function findMean(nums){
    if(nums.length === 0) return 0;
    return nums.reduce(function (acc, cur) {
      return acc + cur;
    }) / nums.length
  }
  
  function findMedian(nums){
    // sort and get the middle element
  
    nums.sort((a, b) => a - b);
  
    let middleIndex = Math.floor(nums.length / 2);
    let median;
  
    if (nums.length % 2 === 0) {
      median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
      median = nums[middleIndex];
    }
    return median
  }
  
  
  
  module.exports = {
    createFrequencyCounter,
    findMean,
    findMedian,
    findMode,
    convertAndValidateNumsArray
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const {
    findMean,
    findMedian,
    findMode,
  } = require("./helpers");
  
  describe("#findMedian", function(){
    it("finds the median of an even set", function(){ 
      expect(findMedian([1, -1, 4, 2])).toEqual(1.5)
    })
    it("finds the median of an odd set", function () { 
      expect(findMedian([1, -1, 4])).toEqual(1)
    })
  })
  
  describe("#findMean", function () {
    it("finds the mean of an empty array", function () { 
      expect(findMean([])).toEqual(0)
    })
    it("finds the mean of an array of numbers", function () { 
      expect(findMean([1,-1,4,2])).toEqual(1.5)
    })
  })
  
  describe("#findMode", function () {
    it("finds the mode", function () { 
      expect(findMode([1,1,1,2,2,3])).toEqual(1)
    })
  })