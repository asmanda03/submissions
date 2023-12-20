function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

//Refactor it to use the rest operator & an arrow function:
/* Write an ES2015 Version */

const filterOutOddNums = (...nums) => {
    return nums.filter(num => num%2 === 0)
}
//code from solution
//const filterOutOdds = (...args) => args.filter(v => v % 2 === 0)



//Write a function called findMin that accepts a variable 
//number of arguments and returns the smallest argument.
//Make sure to do this using the rest and spread operator.
const findMin = (...args) => {//here i used rest operator
    return args.reduce((min, currArg) => {
        return min<currArg ? min : currArg;
    })
}
//code from solution
//const findMin = (...args) => Math.min(...args)



//Write a function called mergeObjects that accepts two objects 
//and returns a new object which contains all the keys and values 
//of the first object and second object.
const mergeObjects = (obj1,obj2) => {
    return {...obj1, ...obj2};
}

//i could also do an implicit return 
const mergeObj = (obj1,obj2) => ({...obj1, ...obj2})



//Write a function called doubleAndReturnArgs which accepts an array 
//and a variable number of arguments. The function should return a new 
//array with the original array values and all of additional arguments doubled.
const doubleAndReturnArgs = (arr,...args) => {
   const newArray = arr.concat(...args);
   return newArray.map(val => val*2)
}

//code from solution
//const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(v => v *2)]
//which is incorrect (typo), should be as follows:
//const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args].map(v => v *2) 




//For this section, write the following functions using rest, spread and refactor 
//these functions to be arrow functions!
//Make sure that you are always returning a new array or object and not modifying 
//the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */
function removeRandom(items) {
    const randomElement = items[Math.floor(Math.random()*items.length)];
    const removeIndex = items.indexOf(randomElement);
    const newArr = [...items.slice(0,removeIndex), ...items.slice(idx+1)];
    return newArr;
}
//code from solution
/*const removeRandom = items => {
    let idx = Math.floor(Math.random() * items.length);
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
}*/


/** Return a new array with every item in array1 and array2. */
function extend(array1, array2) {
return [...array1, ...array2];
}
//code from solution
const extendArrays = (arr1,arr2) => ([...arr1,...arr2])



/** Return a new object with all the keys and values
from obj and a new key/value pair */
function addKeyVal(obj, key, val){
    const updatedObj = {...obj};
    updatedObj[key] = val;
    return updatedObj;
}
const updateObj = (obj,key,val) => ({...obj, [key]:val})



/** Return a new object with a key removed. */
function removeKey(obj, key) { 
    delete obj[key];
    return obj;
}
//code from solution (this one returns a new object)
/*
  let newObj = { ...obj }
  delete newObj[key]
  return newObj;
*/



/** Combine two objects and return a new object. */
function combine(obj1, obj2) {

}
const combined = (obj1,obj2) => {
    const newObj = {...obj1,...obj2}
    return newObj;com
}


/** Return a new object with a modified key and value. */
function update(obj, key, val) {

}
const updated = (obj, key, val) => {
    return { ...obj, [key]: val };
}

