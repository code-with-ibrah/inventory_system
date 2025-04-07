import axios from 'axios'
import {logout, updateToken} from "../state/auth/authSlice.ts";
import {env} from "../config/env.ts";

let store: any

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const injectStore = _store => {
    store = _store
}

export default function api(contentType = 'application/json') {
    const makeRequest = axios.create({
        baseURL: env.API_BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': contentType,
            Authorization: `Bearer ${store.getState().auth.token}`
        }
    })

    makeRequest.interceptors.request.use(function (config) {
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    makeRequest.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config;
        const statusCode = error.response ? error.response.status : 0;

        // If unauthorized (401) and request has not been retried
        if (statusCode === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops

            try {
                const refreshToken = store.getState().auth.refreshToken;
                if (!refreshToken) {
                    return Promise.reject("No refresh token available");
                    // throw new Error("No refresh token available");
                }

                // Request new token
                const {data} = await axios.post(`${env.API_BASE_URL}/auth/refresh-token`, {token: refreshToken});

                if (data.data.accessToken) {
                    // Update token in Redux store
                    store.dispatch(updateToken({accessToken: data.data.accessToken}));

                    // Update request headers with the new token
                    originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

                    // Retry the original request with the new token
                    return makeRequest(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(logout("")); // Dispatch logout action
                localStorage.removeItem('persist:root'); // Clear storage
                window.location.replace('/login'); // Redirect to login

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    });

    return makeRequest
}
