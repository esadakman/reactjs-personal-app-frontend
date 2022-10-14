import { createContext, useState } from "react";
import axios from "axios";
import { toastSuccessNotify } from "../helper/ToastNotify";

export const AuthContext = createContext();

const url = "http://127.0.0.1:8000/";
// const url = "http://esadd26.pythonanywhere.com/"

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [myKey, setMyKey] = useState("");

  const createUser = async (email, password, firstName, lastName, userName) => {
    try {
      const res = await axios.post(`${url}users/auth/register/`, {
        username: userName,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password2: password,
      });

      if (res.data.token) {
        console.log(res);
        setMyKey(res.data.token);
        setCurrentUser(res.data.username);
        sessionStorage.setItem("username", res.data.username);
        // ! for encoding token we use Window.btoa()
        const myToken = window.btoa(res.data.token);
        // ? aldığımız token'ı storage'a ekliyoruz
        sessionStorage.setItem("token", myToken);
        toastSuccessNotify("User registered successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  let value = {
    createUser,
    currentUser,
    myKey,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
