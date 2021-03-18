import React, { } from 'react'
import { connect } from 'react-redux'
// import { Link, NavLink } from 'react-router-dom'

import './Toolbar.css'
import Logo from '../UIElements/Logo'
import Search from '../UIElements/Search'

const Toolbar = props => {
    // const logoutclickedHandler = () => {
    //     props.onLogout()
    // }
    const body = document.body;
    const triggerMenu = document.querySelector(".page-header .trigger-menu");
    if (triggerMenu) {
        triggerMenu.addEventListener("click", () => {
            body.classList.toggle("menu-open");
        });
    }
    // const menu = document.querySelector(".page-header .menu");
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            body.classList.remove(scrollUp);
            return;
        }
        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) { // down
            body.classList.remove(scrollUp);
            body.classList.add(scrollDown);
        } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) { // up
            body.classList.remove(scrollDown);
            body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
    });
    return (
        <header className={`page-header`}>
            <nav>
                <div className="trigger-menu-wrapper">
                    <div className='ToolbarLogo'>
                        <Logo />
                        <p>Ogle</p>
                    </div>
                    <div className="DesktopSearch">
                        <Search /> 
                    </div>
                </div>
            </nav>
        </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
