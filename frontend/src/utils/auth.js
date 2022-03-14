import { handleResponse } from "./utils.js";
//const BASE_URL = "https://api.gali-around.students.nomoreparties.sbs";
const BASE_URL = "http://localhost:3000"


export const register = ({email, password}) => {
  console.log("this email",email);
  console.log("this password",password);
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
  console.log(` login and password ${password} this email: ${email}`);
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
      localStorage.setItem("jwt",data.token);
      return data;
    } else {
      return; // we need to do this to avoid ESLint errors
    }
  });   
};

export const getContent  = (token) => {
  console.log("token line 43", token);
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(handleResponse)
  .then((data) => data);   
};