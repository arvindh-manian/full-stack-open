const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)





let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const foundNote = notes.find(n => n.id === id)

    if (foundNote) {
        response.json(foundNote)
    }
    else {
        response.statusMessage = `ID ${id} not found`
        response.status(404).end()
    }
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body
    const id = request.params.id
    if (!body.content || !body.id || !body.date || body.important === undefined) {
        response.status(400).end()
    }
    else {
        const newNote = {
            content: body.content,
            id: body.id,
            date: body.date,
            important: body.important
        }

        notes = notes.map(n => (n.id === id) ? newNote : n)
        response.json(newNote)
    }

})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return (notes.length > 0) ? Math.max(...notes.map(n => n.id)) + 1 : 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(note)
    response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({'error': 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})