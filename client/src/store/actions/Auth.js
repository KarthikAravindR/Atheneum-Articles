import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userId,token,email,image,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        email: email,
        image: image,
        username: username,
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
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            dispatch(clearall())
        },expirationTime * 1000)
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
                const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId,response.data.token,response.data.email, response.data.image,response.data.username))
                dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}

export const authCheckState = () => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const image = localStorage.getItem('image')
    const username = localStorage.getItem('username')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const localId = localStorage.getItem('userId')
    return dispatch => {
        if(token === null) {
            dispatch(logout())
            dispatch(clearall())
        }else {
            if (expirationDate <= new Date()) {
                dispatch(logout())
                dispatch(clearall())
            }else {
                console.log("auth success")
                dispatch(authSuccess(localId, token, email, image, username))
                dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            }
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
                const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId,response.data.token,response.data.email, response.data.image,response.data.username))
                dispatch(authTimeOut(3600))
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
                const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('expirationDate', expirationDate)
                console.log(response)
                dispatch(authSuccess(response.data.userId,response.data.token,response.data.email, response.data.image,response.data.username))
                dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}

