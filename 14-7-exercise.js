//What does the following code return?
new Set([1,1,2,2,3,4])
//{1,2,3,4}

[...new Set("referee")].join("")
//["r","e","f"].join("")
//"ref"

//What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
//{[1,2,3] => true, [1,2,3] => false}
//from solution
/*
  0: {Array(3) => true}
  1: {Array(3) => false}
*/

//Write a function called hasDuplicate which accepts an array and 
//returns true or false if that array contains a duplicate
function hasDuplicate(arr){
    const arrSet = new Set(arr);
    if(arr.length === arrSet.size) return false;
    return true;
}
//from solution
const hasDuplicate = arr => new Set(arr).size !== arr.length




//Write a function called vowelCount which accepts a string and 
//returns a map where the keys are numbers and the values are the 
//count of the vowels in the string.
function isVowel(char){
    return "aeiou".includes(char);
  }
  
  function vowelCount(str){
    const vowelMap = new Map();
    for(let char of str){
      let lowerCaseChar = char.toLowerCase()
      if(isVowel(lowerCaseChar)){
        if(vowelMap.has(lowerCaseChar)){
          vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
        } else {
          vowelMap.set(lowerCaseChar, 1);
        }
      }
    }
    return vowelMap;
  }