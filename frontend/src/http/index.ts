import axios from "axios";
import config from "../config";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${config.API_BASE_URL}/api`
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
})
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/refresh`, {withCredentials: true,})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
        throw error;
    }
})

export default $api;