import getConfig from 'next/config';
import axios from 'axios'
import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function post(url, body) {
    try {
        const config = {
            method: 'post',
            url: 'http://localhost:7000/api/v1/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        const response = await axios(config);
        console.log(response.data)
        return handleResponse(response.data)
        
    } catch (error) {
        console.log(error)
        handleResponse(error.response.data)
    }

}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    if ([400, 401, 403].includes(response.result.status_code)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // userService.logout();
        throw new Error(response.message)
    }
    return response.result;
}