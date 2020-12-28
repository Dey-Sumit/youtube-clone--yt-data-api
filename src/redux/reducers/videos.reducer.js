import {
   SET_ACTIVE_CATEGORY,
   SEARCHED_VIDEOS_REQUEST,
   SEARCHED_VIDEOS_SUCCESS,
   SEARCHED_VIDEOS_FAILED,
   LIKED_VIDEOS_SUCCESS,
   LIKED_VIDEOS_REQUEST,
   LIKED_VIDEOS_FAILED,
   SUBSCRIPTIONS_VIDEOS_REQUEST,
   SUBSCRIPTIONS_VIDEOS_SUCCESS,
   SUBSCRIPTIONS_VIDEOS_FAILED,
   RELATED_VIDEOS_REQUEST,
   RELATED_VIDEOS_SUCCESS,
   RELATED_VIDEOS_FAILED,
   HOME_VIDEOS_SUCCESS,
   HOME_VIDEOS_FAILED,
   HOME_VIDEOS_REQUEST,
   SELECTED_VIDEO_REQUEST,
   SELECTED_VIDEO_SUCCESS,
} from '../types'

const initialState = {
   videos: [],
   loading: false,
   nextPageToken: null,
   activeCategory: 'All',
   previousCategory: 'All',
}

export const homeVideosReducer = (state = initialState, action) => {
   const { type, payload } = action

   switch (type) {
      case HOME_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case HOME_VIDEOS_SUCCESS:
         return {
            ...state,
            videos:
               payload.category === state.previousCategory
                  ? [...state.videos, ...payload.videos]
                  : payload.videos,
            nextPageToken: payload.nextPageToken,
            loading: false,
         }

      case HOME_VIDEOS_FAILED:
         return {
            ...state,
            errors: payload,
            loading: false,
         }

      case SET_ACTIVE_CATEGORY: {
         return {
            ...state,
            previousCategory: state.activeCategory,
            activeCategory: payload,
         }
      }

      default:
         return state
   }
}

export const likedVideosReducer = (
   state = { loading: true, videos: null },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case LIKED_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
            error: null,
         }

      case LIKED_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }

      case LIKED_VIDEOS_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
export const relatedVideosReducer = (
   state = { loading: true, videos: [] },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case RELATED_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }

      case RELATED_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            error: null,
            loading: false,
         }

      case RELATED_VIDEOS_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}

export const searchedVideosReducer = (
   state = { loading: true, videos: [] },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case SEARCHED_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }

      case SEARCHED_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
            error: null,
         }

      case SEARCHED_VIDEOS_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
export const subscriptionsVideosReducer = (
   state = { loading: true, videos: [] },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case SUBSCRIPTIONS_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }

      case SUBSCRIPTIONS_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
            error: null,
         }

      case SUBSCRIPTIONS_VIDEOS_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
export const selectedVideoReducer = (
   state = { loading: true, video: null },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case SELECTED_VIDEO_SUCCESS:
         return {
            ...state,
            video: payload,
            loading: false,
         }

      case SELECTED_VIDEO_REQUEST:
         return {
            ...state,
            loading: true,
         }

      case LIKED_VIDEOS_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
