import axios from "axios";

const baseUrl = 'http://localhost:3000'

export const callApi = async (endpoint, method, data={}) => {
    const options = {
        url: baseUrl + endpoint,
        method,
        data
    }

    return axios(options).then((response) => {
        const responseAPI = response?.data;
        return responseAPI;
    })
}