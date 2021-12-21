// import sessionStorageService from '../../shared/utilities/session-storage-service';
import { apiConfig } from '../../config';
import { API_BASE_URL } from '@env';

const handleTokenAndRefreshTokenOnRequest = {
    onFulFilled: (config) => {
        // const token = sessionStorageService.getAuthToken();
        // if (token) {
        //     config.headers.common['Authorization'] = 'Bearer ' + token;
        // }

        return config;
    },
    onRejected: (error) => {
        console.error(error);
        return Promise.reject(error);
    }
}

// Executed before any other header configuration.
const requestHeadersConfig = {
    onFulFilled: (config) => {
        config.headers.common['Content-Type'] = 'application/json';
        // config.headers.common['Access-Control-Allow-Origin'] = '*'; // CORS

        return config;
    },
    onRejected: (error) => {
        console.error(error);
        return Promise.reject(error);
    }
}

// First interceptor to be executed.
const apiBasepathUrlConfig = {
    onFulFilled: (config) => {
        if (!API_BASE_URL) {
            throw new Error('No api basepath url configuration found!');
        }
        config.baseURL = API_BASE_URL;

        return config;
    },
    onRejected: (error) => {
        console.error(error);
        return Promise.reject(error);
    }
}

const handlers = [
    handleTokenAndRefreshTokenOnRequest,
    requestHeadersConfig,
    apiBasepathUrlConfig
];

export default handlers;