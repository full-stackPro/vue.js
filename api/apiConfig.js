import axios from 'axios';

export default {
    baseURL: process.env.API_URL || 'https://calltoaction-api-staging.herokuapp.com/api',
    token: localStorage.getItem('token'),
    init() {
        axios.defaults.headers.common['Authorization'] = this.token;
        axios.defaults.baseURL = this.baseURL;
    }
}