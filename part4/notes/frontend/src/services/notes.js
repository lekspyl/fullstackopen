import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}


const create = async newObject => {
  return (await axios.post(baseUrl, newObject)).data
}

const update = async (id, newObject) => {
  return (await axios.put(`${baseUrl}/${id}`, newObject)).data
}

const noteService = {  getAll, create, update }

export default noteService
