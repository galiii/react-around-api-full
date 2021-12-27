import { handleResponse } from "./utils.js";
const BASE_URL = "https://register.nomoreparties.co";

export const register = ({email, password}) => {
  // console.log(`email ${email}   password ${password}`);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  email, password }),
  })
  .then(handleResponse);
};


export const login  = ({  email, password }) => {
  // console.log(`email ${email}   password ${password}`);
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  email, password }),
  })
  .then(handleResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem("token",data.token);
      //console.log("data",data);
      return data;
    } else {
      return; // we need to do this to avoid ESLint errors
    }
  });   
};


export const getContent  = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(handleResponse)
  .then((data) => data);   
};