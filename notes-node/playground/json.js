
// var obj = {
//   name: 'Jason'
// };
//
// var stringObj = JSON.stringify(obj);
//
// console.log(typeof stringObj);
// console.log(stringObj);
//
// var personString = '{"name":"Jason","age": 34}';
//
// var person = JSON.parse(personString);
//
// console.log(typeof person);
// console.log(person);


const fs = require("fs");

var note = {
  title: 'A title',
  body: "Note content"
};

fs.writeFileSync('notes.json', JSON.stringify(note));

console.log('original note : ', note);


var newNote = JSON.parse(fs.readFileSync('notes.json'));

console.log('New Note :', newNote);
