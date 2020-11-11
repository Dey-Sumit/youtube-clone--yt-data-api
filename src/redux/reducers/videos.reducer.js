import { SET_VIDEOS } from "../types"

const initialState = {
    searchedResults: null,
    loading: false
}

export const videosReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_VIDEOS:
            return {
                ...state,
                searchedResults: payload
            }
        default:
            return state
    }
}