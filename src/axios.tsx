import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://website-d1578.firebaseio.com',
});

export default instance;