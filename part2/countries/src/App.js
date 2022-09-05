import { useState, useEffect } from 'react'
import Display from './Display'
import Filter from './Filter'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesFiltered = filter
  ? countries.filter(x => x.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries

  return (
    <div>
      <h1>Country Wiki</h1>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Display countries={countriesFiltered} />
    </div>
  )
}

export default App;
