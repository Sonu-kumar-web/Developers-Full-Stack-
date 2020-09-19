import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// Get the current user profile
export const getCurrentProfile = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/v1/profile/");
      console.log("Current profile", res);
      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
   dispatch
) => {
   try {
      let res = axios.post("/api/v1/profile/create-profile", formData);
      console.log("Profile Creation", res);
      console.log("Create profile token", localStorage.token);

      // console.log("Header", axios.defaults.headers.common["Authorization"]);

      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });

      if (res) {
         dispatch(
            setAlert(edit ? "Profile Updated" : "Profile Created", "success")
         );
      }

      if (!edit) {
         history.push("/dashboard");
      }
   } catch (err) {
      console.log("Profile Creation Error", err.response);

      if (err) {
         dispatch(setAlert(err.response.data.message, "danger"));
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
