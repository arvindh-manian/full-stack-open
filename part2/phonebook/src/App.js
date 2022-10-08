import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleServices from './services/peopleServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [currFilter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const flash = (text, type) => {
    setMessage(text)
    setMessageType("success" === type ? "success" : "error")

    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

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
          flash(`Replaced phone number of ${oldPerson.name} successfully`, "success")
        }
      ).catch(() => {
        flash(`Failed to replace phone number of ${oldPerson.name} because they have been deleted`, "error")
      })
    }
  }

  const deletePersonHandler = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.find(p => p.id === id).name}?`)) {
      peopleServices.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        flash(`Successfully deleted ${persons.find(p => p.id === id).name}.`, "success")
      }).catch(() => {
        flash('Failed to delete user', "error")
      })

    }
  }

  const addPersonHandler = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      flash('No data entered; missing elements', "error")
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
            flash(`${newName} successfully added to the phonebook`, "success")
            setNewName('')
            setNumber('')
          }
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={messageType} message={message}></Notification>
      <Filter filterHandler={filterHandler}></Filter>
      <h2>add a new contact</h2>
      <PersonForm onSubmit={addPersonHandler} changeNameHandler={changeNameHandler} changeNumberHandler={changeNumberHandler}></PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletionCallback={(id) => () => deletePersonHandler(id)}></Persons>
    </div>
  )
}

export default App