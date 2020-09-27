import axios from "axios";

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const timewiseApi = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
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
    timeout: 10000,
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