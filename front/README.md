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


