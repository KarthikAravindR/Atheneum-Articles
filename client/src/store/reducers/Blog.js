import * as actionTypes from '../actions/actionTypes'
// import searchfilter from '../../shared/components/UIElements/Searchfilter'
const initialState = {
    author: null,
    authorpic: null,
    dateposted: null,
    minread: null,
    blogs: [],
    loadedblog: null,
    error: null,
    loading: false,
    searchloading: false,
    queriedBlogs: [],
    isbookmarked: false,
    isliked: false,
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
                loadedblog: action.blog,
                isbookmarked: action.isbookmarked,
                isliked: action.isliked,
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_QUERIED_BLOG_START:
            return {
                ...state,
                searchloading: true
            }
        case actionTypes.FETCH_QUERIED_BLOG_SUCCESS:
            return {
                ...state,
                searchloading: false,
                queriedBlogs: action.blogs
            }
        case actionTypes.FETCH_QUERIED_BLOG_FAILED:
            return {
                ...state,
                searchloading: false,
                error: action.error
            }
        case actionTypes.ADD_BOOKMARK_START:
            return{
                ...state,
            }
        case actionTypes.ADD_BOOKMARK_SUCCESS:
            return{
                ...state,
                isbookmarked: true,
            }
        case actionTypes.ADD_BOOKMARK_FAILED:
            return{
                ...state,
                error: action.error
            }
        case actionTypes.ADD_LIKED_START:
            return{
                ...state,
            }
        case actionTypes.ADD_LIKED_SUCCESS:
            return{
                ...state,
                isliked: true
            }
        case actionTypes.ADD_LIKED_FAILED:
            return{
                ...state,
                error: action.error
            }
            case actionTypes.REMOVE_BOOKMARK_START:
                return{
                    ...state,
                }
            case actionTypes.REMOVE_BOOKMARK_SUCCESS:
                return{
                    ...state,
                    isbookmarked: false,
                }
            case actionTypes.REMOVE_BOOKMARK_FAILED:
                return{
                    ...state,
                    error: action.error
                }
            case actionTypes.REMOVE_LIKED_START:
                return{
                    ...state,
                }
            case actionTypes.REMOVE_LIKED_SUCCESS:
                return{
                    ...state,
                    isliked: false
                }
            case actionTypes.REMOVE_LIKED_FAILED:
                return{
                    ...state,
                    error: action.error
                }
        default:
            return state
    }
}

export default reducer