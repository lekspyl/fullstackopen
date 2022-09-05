import { useState, useEffect } from 'react'
import axios from 'axios'
import Entries from './Entries'
import Filter from './Filter'
import NewEntry from './NewEntry'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, phoneNumber: newNumber }
    if (!(newPerson.name && newPerson.phoneNumber)) {
      alert('Please fill in both fields')
    } else {
      if (persons.some(person => person.name === newPerson.name)) {
        alert(`${newName} already exists in the phonebook`)
      } else {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsFiltered = filter
    ? persons.filter(x => x.name.toLowerCase() === filter.toLowerCase())
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <NewEntry
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Filter filter={filter} onChange={handleFilterChange} />
      <Entries entries={personsFiltered} />
    </div>
  )
}

export default App
