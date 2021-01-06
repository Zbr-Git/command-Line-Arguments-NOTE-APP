const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

//ciustomize yargs version
yargs.version('1.1.0')

//Create add commands
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
       }
    },
    handler (argv)
    {
        notes.addNotes(argv.title , argv.body)
    }
})

//create remove command
yargs.command({
    command : 'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler (argv)
    {
    notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler () 
    {
        // console.log(notes.loadNotes(argv.title , argv.body))
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv)
    {
        notes.readNote(argv.title)
    }
})

yargs.parse()

// console.log(process.argv)
// console.log(yargs.argv)