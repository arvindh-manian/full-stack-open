const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
    if (tokens.method(req, res) === "POST") {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req,res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req,res), 'ms'
    ].join(' ')
}))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const requestedId = Number(request.params.id)
    const person = persons.find(p => p.id === requestedId)
    if (person) {
        response.json(person)
    }

    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const requestedId = Number(request.params.id)
    persons = persons.filter(p => p.id !== requestedId)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        response.status('400').json({
            'error': 'missing name or number'
        })
    }

    else if (persons.find(p => p.name === body.name)) {
        response.status(400).json({
            'error': `${body.name} is already in the phonebook`
        })
    }

    else {
        const newPerson = {
            "id": Math.floor(Math.random() * 1000000),
            "name": body.name,
            "number": body.number
        }

        persons = persons.concat(newPerson)

        response.json(newPerson)
    }
})

const unknownEndpoint = ((request, response) => {
    response.status(404).json({error: "Unknown endpoint"})
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)