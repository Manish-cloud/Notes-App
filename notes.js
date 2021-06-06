const fs = require('fs')
const chalk = require('chalk')
const success = chalk.bgGreenBright
const failure = chalk.bgRedBright

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(success('New note added'))
    }
    else
        console.log(failure('Note title already taken !'))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)

    if(notes.length === newNotes.length )
        console.log(failure('No note found'))
    else{
        console.log(success('Note Removed'))
        saveNotes(newNotes)
    }
}

const listNotes = () => {
    console.log(chalk.bgBlueBright('Your notes'))
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.bgCyan(note.title))
        console.log(note.body)
    }
    else{
        console.log(failure('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}