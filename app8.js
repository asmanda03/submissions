//Write a function called hasOddNumber which accepts an array and returns true 
//if the array contains at least one odd number, otherwise it returns false.

function hasOddNumber(arr){
    return arr.some(function(val){
        return val%2 !== 0;
    })
}

//Write a function called hasAZero which accepts a number and returns true if that 
//number contains at least one zero. Otherwise, the function should return 
function hasAZero(num){
    let numString = num.toString();
    return Array.from(numString).some(function(val){
        return val === '0';
    })
}

//Write a function called hasOnlyOddNumbers which accepts an array and returns true 
//if every single number in the array is odd. If any of the values in the array are 
//not odd, the function should return false.
function hasOddNumber(arr){
    return arr.every(function(val){
        return val%2 !== 0;
    })
}

//Write a function called hasNoDuplicates which accepts an array and returns true if 
//there are no duplicate values (more than one element in the array that has the same 
//value as another). If there are any duplicates, the function should return false.
function hasDuplicates(arr){
    return arr.some(function(el,i){
        while(arr[i+1]){
            if(arr[i+1]===el) return true;
            i++;
        }
    })
}
function hasNoDuplicates(arr){
    return arr.every(function(val){
      return arr.indexOf(val) === arr.lastIndexOf(val);
    });
}

//Write a function called hasCertainKey which accepts an array of objects and a key, 
//and returns true if every single object in the array contains that key. Otherwise 
//it should return false.
function hasCertainKey(arr, key){
    return arr.every(function (obj){
       //obj.hasOwnProperty(key); this didnt work can explore later
       return obj[key]!==undefined;
    })
}

//Write a function called hasCertainValue which accepts an array of objects and a key, 
//and a value, and returns true if every single object in the array contains that value 
//for the specific key. Otherwise it should return false.
function hasCertainValue(arr, key, val){
    return arr.every(function(obj){
        return obj[key]===val;
    })
}