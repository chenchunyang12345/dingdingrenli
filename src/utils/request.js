// import fetch from 'dva/fetch';
const fetch=require("dva").fetch;
const {API_URL_BASE}=require('./config').default;
function parseJSON(response){

    return response.text();
}
function checkStatus(response){

    if (response.status >= 200 && response.status < 300){
        return response;
    }
    // 400 - 401
    if (response.status === 400 || response.status === 401) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function request(url, method, body) {
    return fetch(API_URL_BASE + url, {
        method,
        body: JSON.stringify(body),
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': localStorage.getItem('token'),
        // }
    }).then(checkStatus).then(parseJSON).then(data => ({ data })).catch(err => ({ err }));
}
async function getDataAndTotal(url, method, body) {
    let headers = {};
    let data = await fetch(API_URL_BASE + url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
        }
    })
        .then(checkStatus)
        .then(response => {
            if (response.headers.get('x-total-count')) {
                headers['count'] = parseInt(response.headers.get('x-total-count'));
            }
            return response;
        })
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(err => ({ err }));

    return { ...data, headers: headers };
}

export default {
    get: url => request(url, 'GET'),
    post: (url, body) => request(url, 'POST', body),
    put: (url, body) => request(url, 'PUT', body),
    del: (url, body) => request(url, 'DELETE', body),
    getDataAndTotal: (url, method, body) => getDataAndTotal(url, method, body),
};
