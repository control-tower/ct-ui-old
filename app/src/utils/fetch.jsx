import 'whatwg-fetch';
const base64 = require('base-64');

let headers = {
};

export function setBasicAuth(username, password) {
  headers = {
    Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
  };
}

export function removeBasicAuth() {
  headers = new Headers({});
}

export default function doFetch(url, options) {
  const newHeaders = new Headers(Object.assign({}, headers, options.headers));
  return fetch(url, Object.assign({}, options, { headers: newHeaders, credentials: 'include' }));
}
