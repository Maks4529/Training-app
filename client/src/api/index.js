import axiosInstance from './interceptor';

export const createUser = data => axiosInstance.post('/users', data);

export const getUsers = () => axiosInstance.get('/users');

export const userLogin = data => axiosInstance.post(`/users/login`, data);

export const getProfile = () => axiosInstance.get('/users/profile');

export const updateUser = (id, data) => axiosInstance.patch(`/users/${id}`, data);

export const deleteUser = id => axiosInstance.delete(`/users/${id}`);

export const addTrainingToUser = data => axiosInstance.post('/users/user-trainings', data);


export const createTraining = data => axiosInstance.post('/trainings', data);

export const getTrainings = () => axiosInstance.get('/trainings');

export const updateTraining = (id, data) => axiosInstance.patch(`/trainings/${id}`, data);

export const deleteTraining = id => axiosInstance.delete(`/trainings/${id}`);