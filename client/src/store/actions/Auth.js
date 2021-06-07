import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (userId, token, email, image, username, profession, bio) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        email: email,
        image: image,
        username: username,
        profession: profession,
        bio: bio,
    }
}
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const clearall = () => {
    console.log("CLEAR_ALL CALLED")
    return {
        type: "CLEAR_ALL",
    }
}
export const logout = () => {
    console.log("LOGOUT CALLED")
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            dispatch(clearall())
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isSignup, username) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/signup'
        let authData = {
            username: username,
            email: email,
            password: password,
        }
        if (!isSignup) {
            url = process.env.REACT_APP_BACKEND_URL + '/auth/login'
            authData = {
                email: email,
                password: password,
            }
        }
        axios.post(url, authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                // localStorage.setItem('email', response.data.email)
                // localStorage.setItem('image', response.data.image)
                // localStorage.setItem('username', response.data.username)
                // localStorage.setItem('profession', response.data.profession)
                // localStorage.setItem('bio', response.data.bio)
                // localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username, response.data.profession, response.data.bio))
                // dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const authCheckState = () => {
    const token = localStorage.getItem('token')
    // const email = localStorage.getItem('email')
    // const image = localStorage.getItem('image')
    // const username = localStorage.getItem('username')
    // const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const localId = localStorage.getItem('userId')
    // const profession = localStorage.getItem('profession')
    // const bio = localStorage.getItem('bio')

    return dispatch => {
        if (token === null) {
            dispatch(logout())
            dispatch(clearall())
        } else {
            let url = process.env.REACT_APP_BACKEND_URL + '/profile/' + localId
            axios.get(url)
                .then(response => {
                    console.log(response)
                    console.log("auth success")
                    dispatch(authSuccess(localId, token , response.data.email, response.data.image, response.data.username, response.data.profession, response.data.bio))
                })
                .catch(error => {
                    console.log(error)
                })
            // if (expirationDate <= new Date()) {
            //     dispatch(logout())
            //     dispatch(clearall())
            // }else {
            // dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            // }
        }
    }
}
export const googleauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/googlelogin'
        let authData = {
            tokenId: response.tokenId
        }
        axios.post(url, authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                // localStorage.setItem('email', response.data.email)
                // localStorage.setItem('image', response.data.image)
                // localStorage.setItem('username', response.data.username)
                // localStorage.setItem('profession', response.data.profession)
                // localStorage.setItem('bio', response.data.bio)
                // localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username, response.data.profession, response.data.bio))
                // dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const facebookauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/facebooklogin'
        let authData = {
            userId: response.userID,
            accessToken: response.accessToken
        }
        axios.post(url, authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                // localStorage.setItem('email', response.data.email)
                // localStorage.setItem('image', response.data.image)
                // localStorage.setItem('username', response.data.username)
                // localStorage.setItem('profession', response.data.profession)
                // localStorage.setItem('bio', response.data.bio)
                // localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username, response.data.profession, response.data.bio))
                // dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}


export const updateuserprofessionstart = () => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_START
    }
}
export const updateuserprofessionsuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_SUCCESS,
        data: data
    }
}
export const updateuserprofessionfailed = error => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_FAILED,
        error: error
    }
}
export const updateuserprofession = (profession, userid) => {
    let data = {
        profession,
        userid
    }
    return dispatch => {
        dispatch(updateuserprofessionstart)
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/profession`, data)
            .then(response => {
                console.log(response.data.user.profession)
                // localStorage.setItem('profession', response.data.user.profession)
                dispatch(updateuserprofessionsuccess(response.data.user.profession))
            })
            .catch(error => dispatch(updateuserprofessionfailed(error)))
    }
}


export const updateuserbiostart = () => {
    return {
        type: actionTypes.UPDATE_USER_BIO_START
    }
}
export const updateuserbiosuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_BIO_SUCCESS,
        data: data
    }
}
export const updateuserbiofailed = error => {
    return {
        type: actionTypes.UPDATE_USER_BIO_FAILED,
        error: error
    }
}
export const updateuserbio = (bio, userid) => {
    let data = {
        bio,
        userid
    }
    return dispatch => {
        dispatch(updateuserbiostart)
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/bio`, data)
            .then(response => {
                console.log(response.data)
                // localStorage.setItem('bio', response.data.user.bio)
                dispatch(updateuserbiosuccess(response.data.user.bio))
            })
            .catch(error => dispatch(updateuserbiofailed(error)))
    }
}


export const updateuserimagestart = () => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_START
    }
}
export const updateuserimagesuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_SUCCESS,
        data: data
    }
}
export const updateuserimagefailed = error => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_FAILED,
        error: error
    }
}
export const updateuserimage = (image, userid) => {
    let data = {
        image,
        userid
    }
    return dispatch => {
        dispatch(updateuserimagestart)
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/image`, data)
            .then(response => {
                console.log(response.data)
                // localStorage.setItem('image', response.data.user.image)
                dispatch(updateuserimagesuccess(response.data.user.image))
            })
            .catch(error => dispatch(updateuserimagefailed(error)))
    }
}


export const fetchAllUserInfoStart = () => {
    return {
        type: actionTypes.FETCH_USER_INFO_START,
    }
}
export const fetchAllUserInfoSuccess = (email,image,username, profession,bio,views,blogs,) => {
    return {
        type: actionTypes.FETCH_USER_INFO_SUCCESS,
        email, 
        image, 
        username, 
        profession, 
        bio,
        views,
        blogs,
    }
}
export const fetchAllUserInfoFailed = error => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAILED,
        error: error
    }
}
export const fetchAllUserInfo = (id) => {
    console.log(id)
    return dispatch => {
        dispatch(fetchAllUserInfoStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/profile/' + id
        axios.get(url)
            .then(response => {
                console.log(response)
                    dispatch(fetchAllUserInfoSuccess(
                        response.data.email, 
                        response.data.image, 
                        response.data.username, 
                        response.data.profession, 
                        response.data.bio,
                        response.data.views,
                        response.data.blogs,
                        // response.data.liked,
                        // response.data.bookmarks
                        ))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchAllUserInfoFailed(error))
            })
    }
}

export const fetchUserBookmarkStart = () => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_START,
    }
}

export const fetchUserBookmarkSuccess = (userBookmarks) => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_SUCCESS,
        userBookmarks: userBookmarks
    }
}

export const fetchUserBookmarkFailed = error => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_FAILED,
        error: error
    }
}

export const fetchUserBookmark = (userid, token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchUserBookmarkStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/user/bookmark/' + userid
        axios.get(url,config)
            .then(response => {
                console.log(response)
                dispatch(fetchUserBookmarkSuccess(response.data.userBookmarks))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchUserBookmarkFailed(error))
            })
    }
}

export const fetchUserLikeStart = () => {
    return {
        type: actionTypes.FETCH_USER_LIKED_START,
    }
}

export const fetchUserLikeSuccess = (userLikes) => {
    return {
        type: actionTypes.FETCH_USER_LIKED_SUCCESS,
        userLikes: userLikes
    }
}

export const fetchUserLikeFailed = error => {
    return {
        type: actionTypes.FETCH_USER_LIKED_FAILED,
        error: error
    }
}

export const fetchUserLike = (userid, token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchUserLikeStart)
        let url = process.env.REACT_APP_BACKEND_URL + '/user/like/' + userid
        axios.get(url,config)
            .then(response => {
                console.log(response)
                    dispatch(fetchUserLikeSuccess(response.data.userLikes))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchUserLikeFailed(error))
            })
    }
}


