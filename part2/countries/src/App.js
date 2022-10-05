import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDisplay from './components/CountriesDisplay'
import Filter from './components/Filter'


const App = () => {
    const [currFilter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    const filterController = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setFilter(event.target.value)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => {
                setCountries(response.data)
            })
    }, [])

    const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(currFilter))

    return <div>
        <Filter callback={filterController}></Filter>
        <CountriesDisplay countries={countriesToShow}></CountriesDisplay>
    </div>
    
}

export default App