const axios = require('axios');
const qs = require('qs');

class HTTPClient {
    constructor() {

    }

    filter(filter, method, url, options) {
        let promise = method(url, options);
        if (filter) {
            promise = promise.then(res => res.data);
        }
        return promise;
    }

    get(url, options = {}) {
        return this.filter(!options.raw, axios, url, {
            method: 'GET',
            ...options
        });
    }

    post(url, options = {}) {
        return this.filter(!options.raw, axios, url, {
            method: 'POST',
            ...options
        });
    }

    form(url, options = {}) {
        return this.filter(!options.raw, axios, url, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(options.form),
            ...options
        });
    }
}

module.exports = HTTPClient;