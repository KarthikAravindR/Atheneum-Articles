import * as actionTypes from '../actions/actionTypes'

const inditialState = {
    token: null,
    userid: null,
    username: null,
    image: null,
    email: null,
    error: null,
    loading: false,
    professionloading: false,
    profession: '',
    bioloading: false,
    bio: '',
    userBlogs: [],
    userBookmarks: [],
    userLikes: [],
    views: null,
    Profileusername: null,
    Profileimage: null,
    Profileemail: null,
    Profileloading: false,
    ProfileuserBlogs: [],
    Profileviews: null
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
                loading: false,
                profession: action.profession,
                bio: action.bio,
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
        case actionTypes.UPDATE_USER_PROFESSION_START:
            return {
                ...state,
                professionloading: true
            }
        case actionTypes.UPDATE_USER_PROFESSION_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                professionloading: false,
                profession: action.data
            }
        case actionTypes.UPDATE_USER_PROFESSION_FAILED:
            return {
                ...state,
                professionloading: false,
                error: action.error
            }
        case actionTypes.UPDATE_USER_BIO_START:
            return {
                ...state,
                bioloading: true
            }
        case actionTypes.UPDATE_USER_BIO_SUCCESS:
            return {
                ...state,
                bioloading: false,
                bio: action.data
            }
        case actionTypes.UPDATE_USER_BIO_FAILED:
            return {
                ...state,
                bioloading: false,
                error: action.error
            }
        case actionTypes.UPDATE_USER_IMAGE_START:
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_IMAGE_SUCCESS:
            return {
                ...state,
                image: action.data
            }
        case actionTypes.UPDATE_USER_IMAGE_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_USER_INFO_START:
            return {
                ...state,
                Profileloading: true
            }
        case actionTypes.FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                bio: action.bio,
                profession: action.profession,
                Profileusername: action.username,
                Profileemail: action.email,
                Profileimage: action.image,
                ProfileuserBlogs: action.blogs,
                Profileviews: action.views,
                Profileloading: false
            }
        case actionTypes.FETCH_USER_INFO_FAILED:
            return {
                ...state,
                error: action.error,
                Profileloading: false
            }
        case actionTypes.FETCH_USER_BOOKMARK_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_USER_BOOKMARK_SUCCESS:
            return {
                ...state,
                userBookmarks: action.userBookmarks,
                loading: false
            }
        case actionTypes.FETCH_USER_BOOKMARK_FAILED:
            return {
                ...state,
                error: action.error,
                Profileloading: false
            }
        case actionTypes.FETCH_USER_LIKED_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_USER_LIKED_SUCCESS:
            return {
                ...state,
                userLikes: action.userLikes,
                loading: false
            }
        case actionTypes.FETCH_USER_LIKED_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case 'REMOVE_USER_PROFESSION':
            return {
                ...state,
                profession: ''
            }
        case 'REMOVE_USER_BIO':
            return {
                ...state,
                bio: ''
            }
        case 'CLEAR_AUTH_ERROR':
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export default reducer