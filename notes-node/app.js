const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe:'Title of the note',
  demand:true,
  alias:'t'
};
const bodyOptions = {
  describe:'The body of the note',
  demand:true,
  alias:'b'
};
const titleAndBodyOptions = {
  title:titleOptions,
  body:bodyOptions
};
const titleOnlyOptions = {
  title:titleOptions
};

const argv = yargs
  .command('add','Add a new note',titleAndBodyOptions)
  .command('list', 'List all notes')
  .command('read','Read a note',titleOnlyOptions)
  .command('remove','Remove a note', titleOnlyOptions)
  .help()
  .argv;
  
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);

  if (note) {
    notes.logNote(note);
  } else {
    console.log("Please use a unique title for your note");
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} note(s)`);
  allNotes.forEach ((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }

} else if (command === 'remove') {
  var removed = notes.removeNote(argv.title);

  var message = removed ? 'Note Removed': 'Note not found';
  console.log(message);
} else {
  console.log('command not recognised');
}
