import axios from "axios";

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const timewiseApi = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
});

export default timewiseApi;