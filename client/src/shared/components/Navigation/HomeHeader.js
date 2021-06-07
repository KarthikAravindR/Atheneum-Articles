import React, { } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import './HomeHeader.css'
import Logo from '../UIElements/Logo'
import Search from '../UIElements/Search'
import Avatar from '../UIElements/Avatar'

const HomeHeader = props => {
    const redirectToHomeHandler = () => {
        props.history.push('/home')
    }
    const [shrunk, setShrunk] = React.useState(false)
    React.useEffect(() => {
        const handler = () => {
            setShrunk((shrunk) => {
                if (!shrunk && (document.body.scrollTop > 20 ||
                    document.documentElement.scrollTop > 20)) {
                    return true
                }
                if (
                    shrunk &&
                    document.body.scrollTop < 4 &&
                    document.documentElement.scrollTop < 4
                ) {
                    return false;
                }
                return shrunk;
            })
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener("scroll", handler);
    }, [])
    const articleLikeHandler = () => {
        props.history.push('/user/like/' + props.userid)
    }
    const articleBookmarkHandler = () => {
        props.history.push('/user/bookmark/' + props.userid)
    }
    return (
        <div className="homeheaderwrapper" style={shrunk ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.35)", height: "70px" } : { boxShadow: "none", height: "100px" }}>
            <div className='homeheaderLogo' onClick={redirectToHomeHandler}>
                <Logo />
                <p>Ogle</p>
            </div>
            <div className="HomeHeader_DesktopSearch">
                <Search />
            </div>
            <div className="HomeHeader_User_Profile">
                <div className="HomeHeader_User_icon"><FontAwesomeIcon icon={faThumbsUp}  onClick={() => articleLikeHandler(props.userid)} /></div>
                <div className="HomeHeader_User_icon"><FontAwesomeIcon icon={faBookmark}  onClick={() => articleBookmarkHandler(props.userid)} /></div>
                <Avatar />
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        // email: state.auth.email,
        // token: state.auth.token,
        // image: state.auth.image
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onLogout: () => (dispatch({ type: "LOGOUT" })),
        // onSplit: () => (dispatch({ type: "USER_ON_SPLIT_MODE"})),
        // onNotSplit: () => (dispatch({ type: "USER_NOT_ON_SPLIT_MODE"}))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))
