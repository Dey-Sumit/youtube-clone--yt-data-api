import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/auth.reducer'
import { videosReducer } from './reducers/videos.reducer'
import { commentsReducer } from './reducers/comments.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    videos: videosReducer,
    comments: commentsReducer
})
const initialState = {}
const middleWare = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))