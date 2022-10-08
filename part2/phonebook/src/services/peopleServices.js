import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const replaceNumber = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const peopleServices = {
    getAll,
    addPerson,
    deletePerson,
    replaceNumber
}

export default peopleServices