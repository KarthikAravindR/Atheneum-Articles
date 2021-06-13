import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classes from './Atheneum.module.css'
import * as actions from '../../../store/actions/index'
import BannerCard from '../../../shared/components/UIElements/BannerCard'
import Card from '../../../shared/components/UIElements/Card'

const Atheneum = (props) => {
    let bannerimage = null
    for (let element of props.bannerblog.blog) {
        if (element.type === 'img') {
            bannerimage = element.content.src
            break;
        }
    }
    const articleClickedHandler = id => {
        props.history.push(`/blogview/${id}`)
    }
    const articleBookmarkHandler = (event, id) => {
        event.stopPropagation()
        props.onAddBookmark(props.userid, id)
    }
    const authorClickedHandler = (event, id) => {
        event.stopPropagation()
        props.history.push(`/profile/${id}`)
    }
    return (
            <div className={classes.OgleBanner}>
            <div className={classes.OgleBannerMain}>
                <BannerCard
                    id={props.bannerblog.id}
                    title={props.bannerblog.blog[0].content}
                    authorname={props.bannerblog.authorname}
                    authordp={props.bannerblog.authordp}
                    authorId={props.bannerblog.authorId}
                    bannerimage={bannerimage}
                    minread={props.bannerblog.minread}
                    dateposted={props.bannerblog.dateposted}
                    articleClicked={articleClickedHandler}
                    authorClicked={authorClickedHandler}
                    articleBookmarkHandler={articleBookmarkHandler} />
            </div>
            <div className={classes.OgleBannercards}>
                {props.lastfourcards.map(blog => {
                    let bannerimage = null
                    for (let element of blog.blog) {
                        if (element.type === 'img') {
                            bannerimage = element.content.src
                            break;
                        }
                    }
                    return (
                        <Card
                            key={blog.id}
                            id={blog.id}
                            title={blog.blog[0].content}
                            authorname={blog.authorname}
                            authordp={blog.authordp}
                            authorId={blog.authorId}
                            bannerimage={bannerimage}
                            minread={blog.minread}
                            dateposted={blog.dateposted}
                            articleClicked={articleClickedHandler}
                            authorClicked={authorClickedHandler}
                            articleBookmarkHandler={articleBookmarkHandler} />
                    )
                })}
            </div>
            </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        homepageloading: state.blog.homepageloading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddBookmark: (userid, blogid) => dispatch(actions.addBookmark(userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Atheneum))