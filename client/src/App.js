import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import * as actions from './store/actions/index'

import HomeFeed from './Home/pages/Home'
import Profile from './Profile/pages/Profile'
import SearchBlogs from './SearchBlogs/pages/SearchBlogs';
import Bookmark from './SearchBlogs/components/Bookmark/Bookmark';
import Like from './SearchBlogs/components/Like/Like';
import BlogBuilder from './BlogBuilder/pages/NewBlog'
import BlogViewHome from './BlogView/pages/BlogViewHome'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout/Logout'
import HomeHeader from './shared/components/Navigation/HomeHeader'
import Toolbar from './shared/components/Navigation/Toolbar'
import Spinner from './shared/components/UIElements/LoadingSpinner'


const App = (props) => {

    const {onAutoSignUp} = props;
    useEffect(() => {
      console.log("Auto Sign up")
      onAutoSignUp()
    },[onAutoSignUp])

    return (
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<div className="centerLoading"><Spinner /></div>}>
            {/* <Toast /> */}
            <Route path="/" exact >
              <Auth />
            </Route>
            <Route path="/home" exact >
              <HomeHeader />
              <HomeFeed />
            </Route>
            <Route path="/newblog" exact >
              <HomeHeader />
              <BlogBuilder />
            </Route>
            <Route path="/blogview/:id" exact >
              <Toolbar />
              <BlogViewHome />
            </Route>
            <Route path="/profile/:id" exact >
              <HomeHeader />
              <Profile />
            </Route>
            <Route path="/search/:query" exact >
              <HomeHeader />
              <SearchBlogs />
            </Route>
            <Route path="/user/like/:userid" exact >
              <HomeHeader />
              <Like />
            </Route>
            <Route path="/user/bookmark/:userid" exact >
              <HomeHeader />
              <Bookmark />
            </Route>
            <Route path="/logout" exact >
              <Logout />
            </Route>
          </Suspense>
        </BrowserRouter>
      </div>
    );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);