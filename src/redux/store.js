import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/auth.reducer'
import { videosReducer, likedVideosReducer, searchedVideosReducer, subscriptionsVideosReducer } from './reducers/videos.reducer'
import { commentsReducer, createCommentReducer } from './reducers/comments.reducer'
import { channelDetailsReducer, channelVideosReducer } from './reducers/channel.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    videos: videosReducer,
    comments: commentsReducer,
    createComment: createCommentReducer,
    channelDetails: channelDetailsReducer,
    channelVideos: channelVideosReducer,
    likedVideos: likedVideosReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionVideos: subscriptionsVideosReducer,
})
const initialState = {}
const middleWare = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))