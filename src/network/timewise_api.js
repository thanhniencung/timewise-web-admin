import axios from "axios";

const NETWORK_TIMEOUT = 10000;

const timewiseApi = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: NETWORK_TIMEOUT,
});

timewiseApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

const timewiseAdminApi = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: NETWORK_TIMEOUT,
});

timewiseAdminApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export {
    timewiseApi,
    timewiseAdminApi
};