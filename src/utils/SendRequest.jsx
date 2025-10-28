import axios from 'axios';

const SendRequest = (path, data, authUser, method = 'POST', headers = {}) => {
  // path = "http://10.110.128.5:8080" + path;
  path = "http://10.0.0.97:8080" + path;

  const username = authUser.username;
  const password = authUser.password;
  const token = btoa(`${username}:${password}`);

  headers = {
    ...headers,
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json'
  }

  switch (method) {
    case 'POST':
      return axios.post(path, data, { headers });
    case 'GET':
      return axios.get(path, { headers });
    case 'PUT':
      return axios.put(path, data, { headers });
    case 'DELETE':
      return axios.delete(path, { headers });
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

export default SendRequest;
