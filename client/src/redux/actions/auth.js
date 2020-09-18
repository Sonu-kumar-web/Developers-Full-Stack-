import axios from "axios";
import jwt_decode from "jwt-decode";

import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = (user) => async (dispatch) => {
   let user;
   if (localStorage.token) {
      setAuthToken(localStorage.token);
      user = jwt_decode(localStorage.token);
      console.log("Decoder", user);
   }
   let userData = {
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
   };

   if (userData) {
      dispatch({
         type: USER_LOADED,
         payload: userData,
      });
   } else {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};

// Register User
export const register = ({ name, email, password, password2 }) => async (
   dispatch
) => {
   try {
      let userData = {
         name,
         email,
         password,
         password2,
      };
      let res = await axios.post("/api/v1/users/register", userData);
      console.log("Register Response", res);

      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());

      if (res) {
         const msg = "You have successfully Signup";
         dispatch(setAlert(msg, "success"));
      }
   } catch (err) {
      //   console.log("Error", err.response);
      const errors = err.response.data.email;
      if (errors) {
         dispatch(setAlert(errors, "danger"));
      }

      dispatch({
         type: REGISTER_FAIL,
      });
   }
};

// Login User
export const login = (email, password) => async (dispatch) => {
   try {
      let userData = {
         email,
         password,
      };
      let res = await axios.post("/api/v1/users/login", userData);
      console.log("Login Response", res);

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());

      if (res) {
         const msg = "You have successfully Login";
         dispatch(setAlert(msg, "success"));
      }
   } catch (err) {
      //   console.log("Error", err.response);
      const errors = "Invalid Username/Password";
      if (errors) {
         dispatch(setAlert(errors, "danger"));
      }

      dispatch({
         type: LOGIN_FAIL,
      });
   }
};
