import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import classes from './Bookmark.module.css'
import * as actions from '../../../store/actions/index'
import Card from '../../../shared/components/UIElements/Card'

const Bookmark = props => {
    const {onFetchUserBookmark, userid, token} = props
    useEffect(() => {
        onFetchUserBookmark(userid, token)
    }, [onFetchUserBookmark, userid, token])
    const articleClickedHandler = id => {
        console.log(id)
        props.history.push(`/blogview/${id}`)
    }
    const articleBookmarkHandler = (event, id) => {
        event.stopPropagation()
        props.onAddBookmark(props.userid,id)
    }
    const authorClickedHandler = (event, id) => {
        event.stopPropagation()
        props.history.push(`/profile/${id}`)
    }
    return (
        <div className={classes.userBookmarksContainer}>
            <div className={classes.userBookmarksAuthorContainer}>
                <div className={classes.userBookmarksHeading}>Bookmarks</div>
                <div className={classes.userBookmarksimageContainer}>
                    {props.userBookmarks && props.userBookmarks.map(blog => {
                        let bannerimage = null
                        for (let element of blog.blog) {
                            if (element.type === 'img') {
                                bannerimage = element.content.src
                                break;
                            }
                        }
                        // console.log(blog)
                        return (
                            <div className={classes.userBookmarksCardContainer}>
                                <Card
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.blog[0].content}
                                    authorname={blog.authorname}
                                    authorId={blog.authorId}
                                    authordp={blog.authordp}
                                    bannerimage={bannerimage}
                                    minread={blog.minread}
                                    dateposted={blog.dateposted}
                                    articleClicked={articleClickedHandler}
                                    authorClicked={authorClickedHandler}
                                    articleBookmarkHandler={articleBookmarkHandler}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStatetoProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userid: state.auth.userid,
        userBookmarks: state.auth.userBookmarks
    }
}

const mapDisptachtoState = dispatch => {
    return{
        onFetchUserBookmark: (userid, token) => dispatch(actions.fetchUserBookmark(userid, token))
    }
}

export default withRouter(connect(mapStatetoProps, mapDisptachtoState)(Bookmark))