export const handleResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`${res.statusText}`);

export const customFetch = (url, headers) =>
  fetch(url, headers).then(handleResponse);
