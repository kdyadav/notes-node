console.log("Starting app.js");

const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const yargs = require('yargs');
const _ = require('lodash');

const argv = yargs
            .command('add','Add a new note',{
                title:{
                    describe:'Title of note',
                    demand:true,
                    alias:'t'
                },
                body:{
                    describe:'Body of note',
                    demand:true,
                    alias:'b'
                }
            })
            .help()
            .argv;
const command = process.argv[2];
// console.log("Process", process.argv);
// console.log("Yargs",argv);

if(command==="add") {
    var note  = notes.addNote(argv.title,argv.body);
    if(note){
        console.log("Note created");
        notes.logNote(note);
    }else{
        console.log("Note title taken");
    }  
}
else if(command==="list") {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes::`)
    allNotes.forEach(note => notes.logNote(note));
}
else if(command==="read") {
    var note = notes.getNote(argv.title);
    if(note){
        console.log("Note Found");
        notes.logNote(note);
    }else{
        console.log("Note not Found");
    } 
}
else if(command==="remove") {
    var noteRemoved = notes.removeNote(argv.title);
    var message  = noteRemoved?"Note was Removed":"Note not found";
    console.log(message);
}
else { 
    console.log("Command could not recognised");
}

