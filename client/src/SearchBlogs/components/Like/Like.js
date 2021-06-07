import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import classes from './Like.module.css'
import * as actions from '../../../store/actions/index'
import Card from '../../../shared/components/UIElements/Card'

const Like = props => {
    const {onFetchUserLike, userid, token} = props
    useEffect(() => {
        onFetchUserLike(userid, token)
    }, [onFetchUserLike, userid, token])
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
        <div className={classes.userLikesContainer}>
            <div className={classes.userLikesAuthorContainer}>
                <div className={classes.userLikesHeading}>Liked</div>
                <div className={classes.userLikesimageContainer}>
                    {props.userLikes && props.userLikes.map(blog => {
                        let bannerimage = null
                        for (let element of blog.blog) {
                            if (element.type === 'img') {
                                bannerimage = element.content.src
                                break;
                            }
                        }
                        return (
                            <div className={classes.userLikesCardContainer}>
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
        userLikes: state.auth.userLikes
    }
}

const mapDisptachtoState = dispatch => {
    return{
        onFetchUserLike: (userid, token) => dispatch(actions.fetchUserLike(userid, token))
    }
}

export default withRouter(connect(mapStatetoProps, mapDisptachtoState)(Like))