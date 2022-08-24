import axios from 'axios';
const BASE_URL='https://developer-news-back.herokuapp.com';
export default axios.create({
    baseURL: BASE_URL
});
