const { default: chalk } = require('chalk')
const fs = require('fs')
const { title } = require('process')


const readNote = (title) => 
{
    const notes = loadNotes()

    const note = notes.find( (note) => note.title === title)
     
        if (note)
        {
            console.log(chalk.inverse(note.title))
            console.log(note.body)

        }else {
            console.log(chalk.red.inverse('Note not found'))
        }
    
}

const addNotes =  (title , body) =>
{
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => note.title === title)
    
    if (!duplicateNote)
    { 
        notes.push({
            title: title,
            body: body
        })
        
       saveNotes(notes)
       console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse ('Notes title taken'))
    }
    
}

const saveNotes = (notes) =>
{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , dataJson)
}

const listNotes = () =>
{
    const notes = loadNotes()

    console.log(chalk.blue.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(chalk.inverse('Titles'))
        console.log('=> '+note.title)
        console.log(chalk.inverse('Body'))
        console.log('=> '+note.body)
    });
}

const loadNotes =  () =>
{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }

}

const removeNote =  (title) =>
{

    const notes = loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)

    
    if (notes.length > notesTokeep.length)
    { 
    
        console.log(chalk.green.inverse('Removed the title'))
        saveNotes(notesTokeep)
    } else {
        console.log(chalk.red.inverse('no title found'))
    }
    
    
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    loadNotes: loadNotes,
    listNotes: listNotes,
    readNote: readNote 
}