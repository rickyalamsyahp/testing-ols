import axios from "axios";


export const GET_POST = "GET_POST";
export const GET_POST_USER_ID = "GET_POST_USER_ID";
export const GET_POST_ID = "GET_POST_ID";
export const getPostTesting = (page) => {
  return async (dispatch) => {
    try {
      const resp = await axios(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}&_start=0`,
        {
          method: "GET",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
          // },
        }
      );
      let data = resp.data ? resp.data : [];
      dispatch({
        type: GET_POST,
        data,
      });
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
};


export const getPostTestingByLogin = ({page, userId}) => {
  return async (dispatch) => {
    try {
      const resp = await axios(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}&_start=0&userId=${userId}`,
        {
          method: "GET",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
          // },
        }
      );
      let data = resp.data ? resp.data : [];
      dispatch({
        type: GET_POST_USER_ID,
        data,
      });
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
};
export const getPostTestingById = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
        {
          method: "GET",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
          // },
        }
      );
      let data = resp.data ? resp.data : [];
      dispatch({
        type: GET_POST_ID,
        data,
      });
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
};