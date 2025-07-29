import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'http://localhost:5000/api'});

export const createUser = data => axiosInstance.post('/users', data);

export const getUsers = () => axiosInstance.get('/users');

export const updateUser = (id, data) => axiosInstance.patch(`/users/${id}`, data);

export const deleteUser = id => axiosInstance.delete(`/users/${id}`);