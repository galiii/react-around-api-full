export const handleResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);

export const customFetch = (url, headers) =>
  fetch(url, headers).then(handleResponse);
