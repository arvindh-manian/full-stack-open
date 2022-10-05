import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  const personsToShow = persons.filter((element) => element.name.toLowerCase().includes(currFilter))

  const changeNameHandler = (event) => setNewName(event.target.value)
  const changeNumberHandler = (event) => setNumber(event.target.value)
  const filterHandler = (event) => setFilter(event.target.value)

  const addPersonHandler = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterHandler}></Filter>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPersonHandler} changeNameHandler={changeNameHandler} changeNumberHandler={changeNumberHandler}></PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App