import axios from "axios";

import { selAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/v1/posts");
      dispatch({
         type: GET_POSTS,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
