Around the U.S. project on React, featuring authorization and registration.

This repository will contain your own front-end project on React with added authorization and registration features.
Start working with your previously built front end code from Sprint 11.

All authorization, registration and token requests must go through to the server running on [https://register.nomoreparties.co](https://register.nomoreparties.co/).



# List of All Methods Used in the Application
1) component/App.js
1.1) Use States authorization 
```javascript 
  //Status for auth
const [isSuccessful, setIsSuccessful] = React.useState(false);
//Login
const [isLoggedIn, setIsLoggedIn] = React.useState(false); //if its login go to the next page 

//Auth status fail = false Success = true
const [isStatusInfoTooltip, setStatusInfoTooltip] = React.useState(false);

//Message to the body of tooltipInfo
//2 Choses for now
//Success! You have now been registered.
//Oops, something went wrong! Please try again.
const [message, setMessage ] = React.useState("");


const handleSignUp = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((res) => {
        setIsSuccessful(true);
        setMessage(SUCCESS);
        
      })
      .catch((err) => {
        setIsSuccessful(false);
        setMessage(FAILURE);
      })
      .finally(() =>  setIsInfoTooltipOpen(true));
  };

//on login 
const handleLogin = ({ email, password }) => {
    auth
      ....
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setIsSuccessful(true);
           setMessage(SUCCESS);
        } else {
          setIsSuccessful(false);
          setMessage(FAILURE);
        }
      })
      .catch((err) => {
          setIsSuccessful(false);
          setMessage(FAILURE);
          })
      .finally(() => { setIsInfoTooltipOpen(true);});
  };
```
2) utils/constants.js

```javascript 
export const SUCCESS = "Success! You have now been registered.";
export const FAILURE = "Oops, something went wrong! Please try again.";
```

react-around-api-full

```json 
{
  "name": "around-react",
  "version": "0.1.0",
  "private": true,
  "homepage": "./",
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "npm run build && scp -r ./build/* gali.shipod.1955@gali.students.nomoreparties.sbs:/home/gali.shipod.1955/react-around-api-full/front/build" 
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "gh-pages": "^3.2.3"
  },
  "description": "Around the U.S. project on React, featuring authorization and registration.",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/galiii/react-around-auth.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/galiii/react-around-auth/issues"
  }
}
```










