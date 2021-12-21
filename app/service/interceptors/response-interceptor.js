// import axios from 'axios';
// import { apiConfig } from '../../config';
// import sessionStorageService from '../../shared/utilities/session-storage-service';

const handleRefreshTokenInterceptor = {
    onFulFilled: (response) => {
        return response;
    },
    onRejected: (originalError) => {
        const originalRequest = originalError.config;

        // if (originalError.response.status === 401 && originalRequest.url === apiConfig.tokenGenerationURL) {
        //     window.location = apiConfig.loginPageURL;
        //     return Promise.reject(originalError);
        // }

        // if (originalError.response.status === 401 && !originalRequest._retry) {
        //     // originalRequest._retry = true;
        //     debugger
        //     return axios.get(apiConfig.tokenGenerationURL)
        //         .then(response => {
        //             if (response.status === 201) {
        //                 // sessionStorageService.setAuthToken(response.data.auth_token);
        //                 // originalRequest.headers['Authorization'] = 'Bearer ' + response.data.auth_token;

        //                 return axios(originalRequest);
        //             }
        //         })
        //         .catch(error => {
        //             console.error('Failed to retrieve new token: ', error);
        //             return Promise.reject(originalError);
        //         });
        // }

        return Promise.reject(originalError);
    }
}

const handlers = [
    handleRefreshTokenInterceptor
];

export default handlers;