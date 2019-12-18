import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

let api = axios.create({
  baseURL
});

export const getRequest = (url: string, params?: object) =>
  api
    .get(url, {
      params,
      responseType: 'json'
    })
    .then(res => res.data);

export const postRequest = (url: string, data: object) =>
  api
    .post(url, data)
    .then(res => res.data);