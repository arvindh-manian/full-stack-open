import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleServices from './services/peopleServices'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  useEffect(() => {
            peopleServices
              .getAll()
              .then(
                (response) => setPersons(response)
              )
            }, 
            [])

  const personsToShow = persons.filter((element) => element.name.toLowerCase().includes(currFilter))

  const changeNameHandler = (event) => setNewName(event.target.value)
  const changeNumberHandler = (event) => setNumber(event.target.value)
  const filterHandler = (event) => setFilter(event.target.value)

  const replaceNumberHandler = (oldPerson, number) => {
    if (number !== oldPerson.number && window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      const newPerson = {...oldPerson, number}
      peopleServices.replaceNumber(oldPerson.id, newPerson).then(
        (returnedPerson) => {
          setPersons(persons.map(p => (p.id === oldPerson.id) ? returnedPerson : p))
        }
      )
    }
  }

  const deletePersonHandler = (id) => {
    peopleServices.deletePerson(id)
    if (window.confirm(`Do you really want to delete ${persons.find(p => p.id === id).name}?`)) {
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const addPersonHandler = (event) => {
    event.preventDefault()
    if (newName === '' && newNumber === '') {
      alert('Please enter data')
    }

    else if (persons.find((person) => person.name === newName) !== undefined) {
      replaceNumberHandler(persons.find(person => person.name === newName), newNumber)
      setNumber('')
      setNewName('')
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      peopleServices.addPerson(newPerson).then(
          (response) => {
            setPersons(persons.concat(response))
            setNewName('')
            setNumber('')
            console.log("hi")
          }
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterHandler}></Filter>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPersonHandler} changeNameHandler={changeNameHandler} changeNumberHandler={changeNumberHandler}></PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletionCallback={(id) => () => deletePersonHandler(id)}></Persons>
    </div>
  )
}

export default App