import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const studentApi = {
    getAll: () => api.get('/students'),
    admit: (data) => api.post('/students/admit', data),
};

export const feeApi = {
    getStudentFees: (id) => api.get(`/fees/${id}`),
    pay: (feeId) => api.post('/fees/pay', { feeId }),
};

export const resultApi = {
    getByStudent: (id) => api.get(`/results/${id}`),
    publish: (data) => api.post('/results/publish', data),
};

export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
};

export default api;
