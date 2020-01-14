import axios from "axios"

const API_URL = process.env.REACT_APP_API_BASE

const apiCalls = {
    getRequest: (cb) => {
        axios.get(API_URL, cb)
        .then(res => cb(res.data))
        .catch(err => console.log(err))
    },
    postPatchRequest: (item, cb) => {
        if (item.id) {
            axios.put(`${API_URL}/${item.id}`)
            .then(res => cb(res.data))
            .catch(err => console.log(err))
        } else {
            axios.post(API_URL)
            .then(res => cb(res.data))
            .catch(err => console.log(err))
        }
    },
    deleteRequest: (item, cb) => {
        axios.delete(`${API_URL}/${item.id}`)
        .then(res => cb(item.id))
        .catch(err => console.log(err))
    }
}

export default apiCalls
