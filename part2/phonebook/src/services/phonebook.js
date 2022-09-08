import axios from 'axios'

const baseUrl = 'http://localhost:3001/phonebook'

const getAllEntries = async () => {
  return (await axios.get(baseUrl)).data
}


const createEntry = async newObject => {
  return (await axios.post(baseUrl, newObject)).data
}

const updateEntry = async (id, newObject) => {
  return (await axios.put(`${baseUrl}/${id}`, newObject)).data
}

const deleteEntry = async id => {
  return (await axios.delete(`${baseUrl}/${id}`)).data
}

const phonebookService = { getAllEntries, createEntry, updateEntry, deleteEntry }

export default phonebookService
