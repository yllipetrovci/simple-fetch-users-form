import axios from 'axios';
import requestInterceptors from './interceptors/request-interceptor';
import responseInterceptors from './interceptors/response-interceptor';
import { tryParseResponseData } from '../utilities/try-parse-response-data';

/**
 * Base service that will handle promisse based http calls. Every service
 * that has http client interactions should inherit this service.
 */
class BaseService {
    constructor() {
        this.__addRequestInterceptors(axios, requestInterceptors);
        this.__addResponseInterceptors(axios, responseInterceptors);
    }

    __addRequestInterceptors(axiosRef, requestInterceptors) {
        if ((!requestInterceptors || !Array.isArray(requestInterceptors)) ||
            requestInterceptors.length === 0) return;

        requestInterceptors.forEach(interceptor =>
            axiosRef.interceptors.request.use(interceptor.onFulFilled, interceptor.onRejected))
    }

    __addResponseInterceptors(axiosRef, responseInterceptors) {
        if ((!responseInterceptors || !Array.isArray(responseInterceptors)) ||
            responseInterceptors.length === 0) return;

        responseInterceptors.forEach(interceptor =>
            axiosRef.interceptors.response.use(interceptor.onFulFilled, interceptor.onRejected))
    }

    /**
     * Get Request Method
     * @param {object} getMethodOptions { path|url: 'string', params: {object | URLSearchParams}, authRequest = true }
     */
    _getRequest(getMethodOptions) {
        const options = {
            ...getMethodOptions,
            method: 'get'
        }

        return this.__httpRequest(options);
    }

    /**
     * Post Request Method
     * @param {object} postMethodOptions { path|url: 'string', data|body: {object}, params: {object | URLSearchParams}, authRequest = true }
     */
    _postRequest(postMethodOptions) {
        const options = {
            ...postMethodOptions,
            method: 'post'
        }

        return this.__httpRequest(options);
    }

    /**
     * Put Request Method
     * @param {object} putMethodOptions { path|url: 'string', data|body: {object}, params: {object | URLSearchParams}, authRequest = true }
     */
    _putRequest(putMethodOptions) {
        const options = {
            ...putMethodOptions,
            method: 'put'
        }

        return this.__httpRequest(options);
    }

    /**
     * Delete Request Method
     * @param {object} deleteMethodOptions { path|url: 'string', data|body: {object}, params: {object | URLSearchParams}, authRequest = true }
     */
    _deleteRequest(deleteMethodOptions) {
        const options = {
            ...deleteMethodOptions,
            method: 'delete'
        }

        return this.__httpRequest(options);
    }

    /**
     * Fetch Request Method
     * @param {object} fetchMethodOptions { path|url: 'string', data|body: {object}, params: {object | URLSearchParams}, authRequest = true }
     */
    _fetchRequest(fetchMethodOptions) {
        const options = {
            ...fetchMethodOptions,
            method: 'fetch'
        }

        return this.__httpRequest(options);
    }

    /**
     * 
     * @param {object} options { path|url: 'string', data|body: {object}, params: {object | URLSearchParams}, authRequest = true }
     */
    __httpRequest(options) {
        const definedOptions = {
            method: options.method,
            data: options.data || options.body,
            url: options.path || options.url,
            params: options.params || {},
            authRequest: options.authRequest || true
        }

        return !!definedOptions.authRequest ?
            this.__authorizedHttpRequest(definedOptions)
            :
            this.__unAuthorizedHttpRequest(definedOptions);
    }

    __authorizedHttpRequest(options) {
        const optionsForauthRequest = {
            ...options,
            // transformRequest: [this.__transformAuthRequest],
            // transformResponse: [this.__transformResponse]
        }

        return axios(optionsForauthRequest)
            .then(this.__sanitizeAndReturnReponseBody)
            .catch(this.__handleResponseError);
    }

    __unAuthorizedHttpRequest(options) {
        const optionsForauthRequest = {
            ...options,
            // transformRequest: [this.__transformUnAuthRequest],
            // transformResponse: [this.__transformResponse]
        }
        
        return axios(optionsForauthRequest)
            .then(this.__sanitizeAndReturnReponseBody)
            .catch(this.__handleResponseError);
    }

    __transformAuthRequest(data, headers) { }

    __transformUnAuthRequest(data, headers) { }

    __transformResponse(reponseBody) {
        return tryParseResponseData(reponseBody);
    }

    __sanitizeAndReturnReponseBody(response) {
        return Promise.resolve(response.data || {});
    }

    __handleResponseError(error) {
        return Promise.reject({ 
            status: error.response && error.response.status, 
            statusText: error.response && error.response.statusText, 
            message: error.message,  
        });
    }
}

export default BaseService;