import {
    GET_POST,
    GET_POST_USER_ID,
    GET_POST_ID
} from '../actions/PostActions'

const initialState = {
    post:[],
    postId:[],
    postById:[],
    loading: true,
}

const PresalesReducer = function (state = initialState, action) {
    switch (action.type) {
      case GET_POST: {
        return {
          ...state,
          post: [...state.post, ...action.data],
          loading: false,
        };
      }
      case GET_POST_USER_ID: {
        return {
          ...state,
          postId: [...state.postId, ...action.data],
          loading: false,
       
        };
      }
       case GET_POST_ID: {
        return {
          ...state,
          postById: action.data,
          loading: false,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
}

export default PresalesReducer
