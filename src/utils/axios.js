import axios from 'axios';
const customAxios = axios.create({
  baseURL: 'https://lenslink-api.onrender.com',
  timeout: 4000,

});
export default customAxios;