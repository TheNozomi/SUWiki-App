import HTTPClient from '../http';
import Constants from '../constants';

class FandomAPI {
	constructor() {
		this.http = new HTTPClient();
	}

	getToken(username, password) {
		return new Promise((resolve, reject) => {
			this.http.form(`${Constants.SERVICES_API_URL}/auth/token`, {
				form: {
					username: username,
					password: password
				}
			}).then(resolve).catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          if (err.response.status === 401) {
            reject({
              error: 'unauthorized'
            });
          } else if (err.response.status === 429) {
            reject({
              error: 'rate_limited'
            });
          } else {
            reject({
              error: 'network_error',
              details: err.message
            });            
          }
        } else {
            reject({
              error: 'network_error',
              details: err.message
            });
        }
      });
		});
	}

  whoami(token) {
    return this.http.get(`${Constants.SERVICES_API_URL}/whoami`, {
      headers: {
        'Cookie': `access_token=${token}`
      }
    });
  }


}

module.exports = FandomAPI;