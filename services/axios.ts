import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.defaults.headers['api_key'] = process.env.NEXT_PUBLIC_API_KEY || '';

export default instance;
