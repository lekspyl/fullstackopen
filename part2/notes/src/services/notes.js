import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return (await axios.get(baseUrl)).data.concat(nonExisting)
}


const create = async newObject => {
  return (await axios.post(baseUrl, newObject)).data
}

const update = async (id, newObject) => {
  return (await axios.put(`${baseUrl}/${id}`, newObject)).data
}

const noteService = {  getAll, create, update }

export default noteService
