import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
          setPersons(response.data)
      }
    )
  }

  useEffect(hook, [])

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