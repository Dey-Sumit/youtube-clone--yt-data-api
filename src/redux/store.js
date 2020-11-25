import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/auth.reducer'
import { videosReducer, likedVideosReducer } from './reducers/videos.reducer'
import { commentsReducer, createCommentReducer } from './reducers/comments.reducer'
import { channelReducer } from './reducers/channel.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    videos: videosReducer,
    comments: commentsReducer,
    createComment: createCommentReducer,
    channelDetails: channelReducer,
    likedVideos: likedVideosReducer
})
const initialState = {}
const middleWare = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))