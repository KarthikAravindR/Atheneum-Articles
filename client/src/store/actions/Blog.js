import * as actionTypes from './actionTypes'
import axios from 'axios'

export const publishBlogStart = () => {
    return {
        type: actionTypes.PUBLISH_BLOG_START
    }
}

export const publishBlogSuccess = (blog) => {
    console.log('called')
    return {
        type: actionTypes.PUBLISH_BLOG_SUCCESS,
        blog: blog
    }
}

export const publishBlogFailed = (error) => {
    return {
        type: actionTypes.PUBLISH_BLOG_FAILED,
        error: error
    }
}

export const publishBlog = (userid, username, image, dateposted, minread, secondfilterarray) => {
    return dispatch => {
        dispatch(publishBlogStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/blog/new'
        let authData = {
            authorId: userid,
            username: username,
            image: image,
            dateposted: dateposted,
            minread: minread,
            blog: secondfilterarray,
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(publishBlogSuccess(response.data.blog))
            })
            .catch(error => {
                console.log(error)
                dispatch(publishBlogFailed(error))
            })
    }
}


export const fetchAllBlogsStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_START
    }
}

export const fetchAllBlogsSuccess = (blog) => {
    return {
        type: actionTypes.FETCH_BLOGS_SUCCESS,
        blog: blog
    }
}

export const fetchAllBlogsFailed = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_FAILED,
        error: error
    }
}

export const fetchAllBlogs = () => {
    return dispatch => {
        dispatch(fetchAllBlogsStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/get/blogs'
        axios.get(url)
            .then(response => {
                console.log(response)
                dispatch(fetchAllBlogsSuccess(response.data.blog))
            })
            .catch(error => {
                console.log(error)
                // dispatch(fetchAllBlogsFailed(error))
            })
    }
}


export const fetchParticularBlogStart = () => {
    return {
        type: actionTypes.FETCH_PARTICULAR_BLOG_START
    }
}

export const fetchParticularBlogSuccess = (blog, isbookmarked, isliked) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_BLOG_SUCCESS,
        blog: blog,
        isbookmarked: isbookmarked,
        isliked: isliked
    }
}

export const fetchParticularBlogFailed = (error) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_BLOG_FAILED,
        error: error
    }
}

export const fetchParticularBlog = (id, userid) => {
    return dispatch => {
        dispatch(fetchParticularBlogStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/blogview/' + id
        let data = {
            userid: userid
        }
        axios.post(url,data)
            .then(response => {
                console.log(response)
                dispatch(fetchParticularBlogSuccess(response.data.blog,response.data.isbookmarked,response.data.isliked))
            })
            .catch(error => {
                console.log(error)
                // dispatch(fetchParticularBlogFailed(error))
            })
    }
}


export const fetchQueriedBlogStart = () => {
    return {
        type: actionTypes.FETCH_QUERIED_BLOG_START
    }
}

export const fetchQueriedBlogSuccess = (blogs) => {
    return {
        type: actionTypes.FETCH_QUERIED_BLOG_SUCCESS,
        blogs: blogs
    }
}

export const fetchQueriedBlogFailed = (error) => {
    return {
        type: actionTypes.FETCH_QUERIED_BLOG_FAILED,
        error: error
    }
}

export const fetchQueriedBlog = (query) => {
    console.log(query)
    return dispatch => {
        dispatch(fetchQueriedBlogStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/blogsearch/' + query
        axios.get(url)
            .then(response => {
                console.log(response)
                dispatch(fetchQueriedBlogSuccess(response.data.filteredblog))
            })
            .catch(error => {
                console.log(error)
                // dispatch(fetchQueriedBlogFailed(error))
            })
    }
}


export const addBookmarkStart = () => {
    return{
        type: actionTypes.ADD_BOOKMARK_START
    }
}

export const addBookmarkSuccess = () => {
    return{
        type: actionTypes.ADD_BOOKMARK_SUCCESS
    }
}

export const addBookmarkFailed = error => {
    return{
        type: actionTypes.ADD_BOOKMARK_FAILED,
        error: error
    }
}

export const addBookmark = (userid, blogid) => {
    return dispatch => {
        dispatch(addBookmarkStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/userbookmark'
        let data ={
            userid,
            blogid
        }
        axios.post(url, data)
        .then(response => {
            console.log(response)
            dispatch(addBookmarkSuccess())
        })
        .catch(error => {
            console.log(error)
            dispatch(addBookmarkFailed(error))
        })
    }
}

export const addLikeStart = () => {
    return{
        type: actionTypes.ADD_LIKED_START
    }
}

export const addLikeSuccess = () => {
    return{
        type: actionTypes.ADD_LIKED_SUCCESS
    }
}

export const addLikeFailed = error => {
    return{
        type: actionTypes.ADD_LIKED_FAILED,
        error: error
    }
}

export const addLike = (userid, blogid) => {
    return dispatch => {
        dispatch(addLikeStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/userlike'
        let data ={
            userid,
            blogid
        }
        axios.post(url, data)
        .then(response => {
            console.log(response)
            dispatch(addLikeSuccess())
        })
        .catch(error => {
            console.log(error)
            dispatch(addLikeFailed(error))
        })
    }
}


export const removeBookmarkStart = () => {
    return{
        type: actionTypes.REMOVE_BOOKMARK_START
    }
}

export const removeBookmarkSuccess = () => {
    return{
        type: actionTypes.REMOVE_BOOKMARK_SUCCESS
    }
}

export const removeBookmarkFailed = error => {
    return{
        type: actionTypes.REMOVE_BOOKMARK_FAILED,
        error: error
    }
}

export const removeBookmark = (userid, blogid) => {
    return dispatch => {
        dispatch(removeBookmarkStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/userbookmarkremove'
        let data ={
            userid,
            blogid
        }
        axios.post(url, data)
        .then(response => {
            console.log(response)
            dispatch(removeBookmarkSuccess())
        })
        .catch(error => {
            console.log(error)
            dispatch(removeBookmarkFailed(error))
        })
    }
}

export const removeLikeStart = () => {
    return{
        type: actionTypes.REMOVE_LIKED_START
    }
}

export const removeLikeSuccess = () => {
    return{
        type: actionTypes.REMOVE_LIKED_SUCCESS
    }
}

export const removeLikeFailed = error => {
    return{
        type: actionTypes.REMOVE_LIKED_FAILED,
        error: error
    }
}

export const removeLike = (userid, blogid) => {
    return dispatch => {
        dispatch(removeLikeStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/userlikeremove'
        let data ={
            userid,
            blogid
        }
        axios.post(url, data)
        .then(response => {
            console.log(response)
            dispatch(removeLikeSuccess())
        })
        .catch(error => {
            console.log(error)
            dispatch(removeLikeFailed(error))
        })
    }
}