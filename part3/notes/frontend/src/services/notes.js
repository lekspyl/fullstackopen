import axios from 'axios'

const baseUrl = 'https://lekspyl-part3-notes-backend.fly.dev/api/notes'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}


const create = async newObject => {
  return (await axios.post(baseUrl, newObject)).data
}

const update = async (id, newObject) => {
  return (await axios.patch(`${baseUrl}/${id}`, newObject)).data
}

const noteService = {  getAll, create, update }

export default noteService
