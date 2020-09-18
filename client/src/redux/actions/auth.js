import axios from "axios";

import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alert";

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
      console.log("Token", res);
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
