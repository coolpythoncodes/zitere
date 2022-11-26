import axios from "axios"

export const fetch = async (...args) => {
    const res = await axios.get(...args)
    return res.data
}