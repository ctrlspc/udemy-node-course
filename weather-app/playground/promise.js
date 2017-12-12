var asyncAdd = (a,b) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve (a+b);
      } else {
        reject('Could not add up you numbers');
      }
    }, 2500)
  })
}

asyncAdd(1,3).then((result) => {
  console.log('Success:', result);
  return asyncAdd(result, 33);
}). then((result) => {
  console.log('Success:', result);
}). catch((errorMessage) => {
  console.log('Error:', errorMessage);
});


// var somePromise = new Promise((resolve, reject) => {
//
//   setTimeout(() => {
//     //resolve('Hey. It worked');
//     reject('Hey. It failed!');
//   }, 2500)
//
// });
//
// somePromise.then((messgage) => {
//   console.log('Success: ', messgage);
// }, (message)=> {
//   console.log('Error: ', message);
// });
