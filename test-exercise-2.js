// 1. Please write a function that shows the usage of closures.
    function computeX(x) {
      return function computeXAndY(y) {
        return x + y;
      }
    }
  
  // Example:
    let computing = computeX(3);
    computing(3); // Output : 6
  
// 2. Please write a function that returns a sum of array items
    // example input [9, 1, 22, 0, 2]
    // example output 34

    function sumInts(arrInput) {
      return arrInput.reduce((current, next) => {
        return current + next; });
    }
  
    sumInts([9, 1, 22, 0, 2]);
  
// 3. Please write a recursive function that flattens a list of items
  // example input [[2, [4, [44,5,6]]], [4,5,6], [[2,4], 4], 5]]
  // example output [2, 4, 44, 5, 6, 4, 5, 6, 2, 4, 4, 5]
  const flatten = function(arrInput, result = []) {
    for (let i = 0; i < arrInput.length; i++) {
      const value = arrInput[i];
      if (Array.isArray(value)) {
        flatten(value, result);
      } else {
        result.push(value);
      }
    }
    return result;
  };
  
 // 4. Please write a function that finds all common elements of two arrays(only primitive types as array elements, order doesn't matter)
  // example inputs ['b', 3, 4, 76, 'c'], ['a', 'b', 4, 76, 21, 'e']
  // example output ['b', 4, 76]
    function intersection(arr1, arr2) {
      let elms = [];
      elms = arr1.filter((elm) => {
        if (arr2.includes(elm)) return elm; });
      return elms;
    }

// 5. Please write a function that finds all different elements of two arrays(only primitive types as array elements, order doesn't matter)
  // example inputs ['b', 3, 4, 76, 'c'], ['a', 'b', 4, 76, 21, 'e']
  // example output ['a', 3, 21, 'c', 'e']
  function differences(arr1, arr2) {
    let elms = [];
    function arrSel(a1, a2) {
      elms = [...elms, ...(a1.filter((elm) => {
        return a2.indexOf(elm) === -1;
      }))];
   }
    arrSel(arr1, arr2);
    arrSel(arr2, arr1);
    return elms;
  }
  
// 6. Please write a function that takes two arrays of items and returns an array of tuples made from two input arrays at the same indexes. Excessive items should be dropped.
  // example input [1,2,3], [4,5,6,7]
  // example output [[1,4], [2,5], [3,6]]

  function tupler(arr1, arr2) {
    let arrTuples = [];
    let counter = arr1.length < arr2.length ? arr1.length : arr2.length;
    for (let i = 0; i < counter; i++) {
      arrTuples.push([arr1[i], arr2[i]]);
    }
    return arrTuples;
  }
  
// 7.  Please write a function which takes a path(path is an array of keys) and object, then returns value at this path. If value at path doesn't exists, return undefined.
  // example inputs ['a', 'b', 'c', 'd'], { a: { b: { c: { d: '23' } } } }
  // example output '23'
  
  function pathVal(arr, obj, counter = 0) {
    while (counter < arr.length) {
      obj = obj[arr[counter]];
      if (typeof obj !== 'object') { break; }
      counter++;
    }
    return obj;
  }
  
// 8. Please write compare function which compares 2 objects for equality.
  // example input { a: 'b', c: 'd' }, { c: 'd', a: 'b' }  /// output true
  // example input { a: 'c', c: 'a' }, { c: 'd', a: 'b', q: 's' }  /// output false
  // Example: objCompare({ a: 'c', c: 'a' }, { c: 'd', a: 'b', q: 's' });
  
  function objCompare(o1, o2) {
    let objsEq = true;
    let o1L = Object.keys(o1).length, o2L = Object.keys(o2).length;

    if (o1 === o2) { 
     return true; 
    }
    else if (o1L !== o2L) { 
     return false; 
    }
    else {
    let o1Keys = Object.keys(o1);
      for (let x of o1Keys) {
        if (o1[x] !== o2[x]) {
            objsEq = false;
            break;
            }
        }
        return objsEq;
    }
}


// 9. Please write a function which takes a list of keys and an object, then returns this object, just without keys from the list
// example input ['color', 'size'], { color: 'Blue', id: '22', size: 'xl' }
// example output { id: '22' }

  function objFilter(criteria, obj) {
    const oEntries = Object.entries(obj);
    const filteredArr = oEntries.filter(function ([key, value]) {
      return !(criteria.includes(key));
    });
    const newObj = Object.fromEntries(filteredArr);
    return newObj;
  }