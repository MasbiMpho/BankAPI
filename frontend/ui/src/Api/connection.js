import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const API = () => {

    return axios.get(API_BASE_URL);

}