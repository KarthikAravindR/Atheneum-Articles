import * as actionTypes from '../actions/actionTypes'

const inditialState = {
    token: null,
    userid: null,
    username: null,
    image: null,
    email: null,
    error: null,
    loading: false,
    startdate: null,
    enddate: null,
    description : null
}

const reducer = (state = inditialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                // token: action.idToken,
                userid: action.userId,
                token: action.token,
                email: action.email,
                image: action.image,
                username: action.username,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userid: null,
                username: null,
                image: null,
                email: null,
            }
        case 'CLEAR_AUTH_ERROR':
            return {
                ...state,
                error: null
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startdate : action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                enddate : action.date
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description : action.value
            }
        default:
            return state
    }
}

export default reducer