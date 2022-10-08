import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em>Note App, 2022</em>
        </div>
    )
}

const App = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('error occurred')

    const hook = () => {noteService
                        .getAll()
                        .then(notesList => {
                            setNotes(notesList)
                        })}

    useEffect(hook, [])

    const notesToShow = showAll ? notes: notes.filter(note => note.important)


    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }

        noteService
            .create(noteObject)
            .then((returnedNote) => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (noteID) => {
        const note = notes.find(n => n.id === noteID)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(noteID, changedNote)
            .then((returnedNote) => {
                setNotes(notes.map(n => n.id !== noteID ? n : returnedNote))
            })
            .catch((error) => {
                setErrorMessage(
                    `The note "${note.content}" was already deleted from the server`
                )

                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter((n) => n.id !== noteID))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}></Notification>
            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
            </div>
            <ul>
                {notesToShow.map(note => 
                    <Note key={note.id} note={note} updateImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type='submit'>save</button>
            </form>
            <Footer></Footer>
        </div>
    )
}

export default App