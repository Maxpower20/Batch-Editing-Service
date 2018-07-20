const axios = require('axios');

function sendGetRequest(url) {
  const axiosInstanse = axios.create({
    baseURL: url,
  });

  return axiosInstanse.get('');
}

function sendPutRequest(url, body) {
  const axiosInstanse = axios.create({
    baseURL: url,
    data: body,
  });

  return axiosInstanse.put('');
}

module.exports = {
  sendGetRequest,
  sendPutRequest,
};
