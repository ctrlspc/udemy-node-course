console.log('Starting App');


setTimeout( () => {
  console.log('inside callback');
}, 2000);

setTimeout( () => {
  console.log('inside callback with 0 timeout');
}, 0);

console.log('Finishing Up');
