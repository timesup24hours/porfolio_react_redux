import axios from 'axios';

export function setAuthorizationToken(token) {
  if(token) {
    axios.defaults.headers['x-access-token'] = token;
  } else {
    delete axios.defaults.headers['x-access-token'];
  }
}
