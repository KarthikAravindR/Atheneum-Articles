import React, { } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import './HomeHeader.css'
import Logo from '../UIElements/Logo'
import Search from '../UIElements/Search'
import Avatar from '../UIElements/Avatar'

const HomeHeader = props => {
    return (
        <div className="homeheaderwrapper">
            <div className='homeheaderLogo'>
                <Logo />
                <p>Ogle</p>
            </div>
            <div className="DesktopSearch">
                <Search />
            </div>
            <Avatar />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null,
        // userid: state.auth.userid,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
