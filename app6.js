//this method doesnt give a new array
//it updates the given array
function double(arr){
    for(let i=0; i<arr.length; i++){
        arr[i]*=2;
        
    }
    return arr;
}

//this is how we give a new array
function doubleValues(arr){
    let newArray = [];//for each does not creat a new array so i manually do that here
    arr.forEach(function(val){
        return newArray.push(val * 2);
    });
    return newArray;
}

//this function accepts an array and returns a new array with only
//the even values or the original array passed to the function
function onlyEvenValues(arr){
   return arr.filter(function(val){
        return val % 2 === 0;
    })    
}

//Write a function called showFirstAndLast which accepts an array of strings 
//and returns a new array with only the first and last character of each string

function showFirstAndLast(arr){
    const newArray = [];
    arr.forEach(function(str){ //doesnt work when i put return infront of arr.forEach like above for filter, why?
       return newArray.push(str[0]+str[str.length-1])
    })
    return newArray;
}

//Write a function called addKeyAndValue which accepts an array of objects, a key, and a value 
//and returns the array passed to the function with the new key and value added for each object
function addKeyAndValue(arr, key, value){
    for(let i=0; i<arr.length; i++){
        arr[i][key] = value;
    }
    return arr;
}
//to write the same function above using forEach
function addingKeyValue(arr, key, value){
    arr.forEach(function(obj){
    return obj[key] = value;
})
    return arr;
}


//Write a function called vowelCount which accepts a string and returns an object 
//with the keys as the vowel and the values as the number of times the vowel appears 
//in the string. This function should be case insensitive so a lowercase letter and 
// uppercase letter should count
function vowelCountss(str){
    const obj = {};

    //console.log(Array.from('aeiou'));

    Array.from('aeiou').forEach(function(vowel){

        //console.log(vowel, i)

        //str = individually

        let count = 0;
        for(let i=0; i<str.length; i++){
            if(str[i] === vowel){
                count++;
            }
            console.log(vowel[i] +" "+ count);
           //if(count!==0){ return obj[char]=count;}
        }
        if(count!== 0) console.log("this is outside of for loop", count);
       // if(count!==0) return obj[str[i]]=count;
          //return obj;
        })
        return obj;
    }


    function vowelCounts(str){
        const obj = {};
    
        //console.log(Array.from('aeiou'));
    
        Array.from(str).forEach(function(char){
    
            //console.log(vowel, i)
    
            //str = individually
            let vowel = 'aeiou'
            let count = 0;
            for(let i=0; i<vowel.length; i++){
                if(vowel[i]===char){
                    count++;
                }
                console.log(vowel[i] +" "+ count);
               //if(count!==0){ return obj[char]=count;}
            }
            if(count!== 0) console.log("this is outside of for loop",char, count);
           // if(count!==0) return obj[str[i]]=count;
              //return obj;
            })
            return obj;
        }

    //for(let char of str){
        //if(char === vowel){
          //  count++;
        //}
        //if(count!==0){ return obj[char]=count;}




        function vowelCount(str){
            const obj = {};
        
            //console.log(Array.from('aeiou'));
        
            Array.from(str).forEach(function(char,i){
        
                //console.log(vowel, i)
        
                //str = individually
        
                let count = 0;
                for(let vowel of 'aeiou'){
                    if(char === vowel){
                        count++;
                    }
                    //console.log(count);
                   if(count!==0){ return obj[char]=count;}
                }
                //if(count!==0) console.log(count);
                //if(count!==0) return obj[char]=count;
                  //return obj;
                })
                return obj;
            }
        
//Write a function called doubleValuesWithMap which accepts an array and returns 
//a new array with all the values in the array passed to the function doubled           
 function doubleValuesWithMap(arr){
    return arr.map(function(val){
        return val*2;
    })
 }

 //Write a function called valTimesIndex which accepts an array and returns a new 
 //array with each value multiplied by the index it is currently at in the array
 function valTimesIndex(arr){
    return arr.map(function(val, i){
        return val*i;
    })
 }

 //Write a function called extractKey which accepts an array of objects and 
 //some key and returns a new array with the value of that key in each object
 function extractKey(arr, key){
    return arr.map(function(obj){
        return obj[key];
    })
 }

 //Write a function called extractFullName which accepts an array of objects and 
 //returns a new array with the value of the key with a name of “first” and the value 
 //of a key with the name of “last” in each object, concatenated together with a space.
 function extractFullName(arr){
    return arr.map(function(obj){
        return `${obj.first} ${obj.last}`;
    })
 }

 //Write a function called filterByValue which accepts an array of objects and
 //a key and returns a new array with all the objects that contain that key
 function filterByValue(arr, key){
    return arr.filter(function(obj){
        return obj[key] !== undefined;
    })

 } 

//Write a function called find which accepts an array and a value and returns the first 
//element in the array that has the same value as the second parameter or undefined if the 
//value is not found in the array
function find(arr, num){
    return arr.filter(function(val){
        return val === num;
    })[0];
}

//Write a function called findInObj which accepts an array of objects, a key, and some value 
//to search for and returns the first found value in the array.
function findInObj(arr, key, someVal){
    return arr.filter(function(obj){
        return obj[key] === someVal;
    })[0];
}

//Write a function called removeVowels which accepts a string and returns a new string with 
//all of the vowels (both uppercased and lowercased) removed. Every character in the new 
//string should be lowercased.
function removeVowels(str){
    const vowel = 'aeiou';
    return Array.from(str.toLowerCase()).filter(function(char){
        return vowel.indexOf(char) === -1
    }).join('');
}

//Write a function called doubleOddNumbers which accepts an array and returns a new array 
//with all of the odd numbers doubled (HINT - you can use map and fitler to double and then 
//filter the odd numbers).
function doubleOddNumbers(arr){
    return arr.filter(function(odds){
        return odds%2 !== 0;
    }).map(function(val){
        return val*2;
    })
    
}