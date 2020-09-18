import axios from "axios";

import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }
   try {
      const res = await axios.get("/api/v1/profile");
      dispatch({
         type: USER_LOADED,
         payload: res.data,
      });
   } catch (err) {
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
      console.log("Response", res);

      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
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
