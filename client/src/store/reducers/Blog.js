import * as actionTypes from '../actions/actionTypes'

const initialState = {
    author: null,
    authorpic: null,
    dateposted: null,
    minread: null,
    blogs: [],
    loadedblog: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUBLISH_BLOG_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PUBLISH_BLOG_SUCCESS:
            // let upadtedBlogs = [action.blog]
            // upadtedBlogs.concat(...state.blogs)
            // console.log(upadtedBlogs)
            return {
                ...state,
                loading: false,
                // blogs: upadtedBlogs
            }
        case actionTypes.PUBLISH_BLOG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_BLOGS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.blog,
                loadedblog: null
            }
        case actionTypes.FETCH_BLOGS_FAILED:
        
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedblog: action.blog
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer