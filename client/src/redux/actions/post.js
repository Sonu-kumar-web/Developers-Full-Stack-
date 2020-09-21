import axios from "axios";

import { selAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

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

// Add Like
export const addLike = (id) => async (dispatch) => {
   try {
      const res = await axios.post(`/api/v1/like/${id}`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id, likes: res.data },
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// Remove Like
export const removeLike = (id) => async (dispatch) => {
   try {
      const res = await axios.post(`/api/v1/unlike/${id}`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id, likes: res.data },
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};
