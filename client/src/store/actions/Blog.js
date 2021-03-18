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

export const fetchParticularBlogSuccess = (blog) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_BLOG_SUCCESS,
        blog: blog
    }
}

export const fetchParticularBlogFailed = (error) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_BLOG_FAILED,
        error: error
    }
}

export const fetchParticularBlog = (id) => {
    return dispatch => {
        dispatch(fetchParticularBlogStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/blogview/' + id
        axios.get(url)
            .then(response => {
                console.log(response)
                dispatch(fetchParticularBlogSuccess(response.data.blog))
            })
            .catch(error => {
                console.log(error)
                // dispatch(fetchParticularBlogFailed(error))
            })
    }
}