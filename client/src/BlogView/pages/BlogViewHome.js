import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as fasolidBookmark, faThumbsUp as fasolidThumbsUp } from '@fortawesome/free-solid-svg-icons'

import classes from './BlogViewHome.module.css'
import * as actions from '../../store/actions/index'

const BlogViewHome = props => {
    const { match, loadedblog, onFetchParticularBlog, userid } = props
    useEffect(() => {
        if (match.params.id) {
            if (!loadedblog || (loadedblog && loadedblog.id !== +match.params.id)) {
                onFetchParticularBlog(match.params.id, userid)
            }
        }
    }, [match, userid])
    const [shrunk, setShrunk] = useState(false)
    useEffect(() => {
        const handler = () => {
            setShrunk((shrunk) => {
                if (!shrunk && (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)) {
                    return true
                }
                if (shrunk && document.body.scrollTop < 250 && document.documentElement.scrollTop < 250) {
                    return false
                }
                return shrunk
            })
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])
    const articleBookmarkHandler = (event, id) => {
        props.onAddBookmark(props.userid, id)
    }
    const articleLikeHandler = (event, id) => {
        props.onAddLike(props.userid, id)
    }
    const articleRemoveBookmarkHandler = (event, id) => {
        props.onRemoveBookmark(props.userid, id)
    }
    const articleRemoveLikeHandler = (event, id) => {
        props.onRemoveLike(props.userid, id)
    }
    return (
        <div className={classes.Container}>
            {(props.loadedblog && shrunk) && <div className={classes.fixedAuthorDetails}>
                <div className={classes.authordetails}>
                    <div className={classes.authordp}>
                        <img src={loadedblog.authordp} alt="author" />
                    </div>
                    <p>{loadedblog.authorname}</p>
                </div>
                <p>
                    {loadedblog.dateposted} &bull; {loadedblog.minread} min read &bull;
                </p>
                <div className={classes.fixedbuttonicons}>
                    {props.isbookmarked
                        ? <FontAwesomeIcon icon={fasolidBookmark} className={classes.bookmarktrueicon} onClick={(event) => articleRemoveBookmarkHandler(event, loadedblog.id)} />
                        : <FontAwesomeIcon icon={faBookmark} className={classes.bookmarkfalseicon} onClick={(event) => articleBookmarkHandler(event, loadedblog.id)} />}
                    &bull;
                    {props.isliked
                        ? <FontAwesomeIcon icon={fasolidThumbsUp} className={classes.liketrueicon} onClick={(event) => articleRemoveLikeHandler(event, loadedblog.id)} />
                        : <FontAwesomeIcon icon={faThumbsUp} className={classes.likefalseicon} onClick={(event) => articleLikeHandler(event, loadedblog.id)} />}
                </div>
            </div>}
            {props.loadedblog && <div className={classes.blog}>
                <div className={classes.details}>
                    <div className={classes.authordetails}>
                        <div className={classes.authordp}>
                            <img src={loadedblog.authordp} alt="author" />
                        </div>
                        <p>{loadedblog.authorname}</p>
                    </div>
                    <p>
                        {loadedblog.dateposted} &bull; {loadedblog.minread} min read &bull;
                        {props.isbookmarked
                            ? <FontAwesomeIcon icon={fasolidBookmark} className={classes.bookmarktrueicon} onClick={(event) => articleRemoveBookmarkHandler(event, loadedblog.id)} />
                            : <FontAwesomeIcon icon={faBookmark} className={classes.bookmarkfalseicon} onClick={(event) => articleBookmarkHandler(event, loadedblog.id)} />}
                        &bull;
                        {props.isliked
                            ? <FontAwesomeIcon icon={fasolidThumbsUp} className={classes.liketrueicon} onClick={(event) => articleRemoveLikeHandler(event, loadedblog.id)} />
                            : <FontAwesomeIcon icon={faThumbsUp} className={classes.likefalseicon} onClick={(event) => articleLikeHandler(event, loadedblog.id)} />}
                    </p>
                </div>
                <div className={classes.heading}>
                    <p>{loadedblog.blog[0].content}</p>
                </div>
                <div className={classes.content}>
                    {props.loadedblog.blog.map(content => {
                        if (content.type === null) {
                            return <p>{content.content}</p>
                        } else if (content.type === 'img') {
                            return <img src={content.content.src} alt="" />
                        }
                        return null
                    })}
                </div>
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loadedblog: state.blog.loadedblog,
        userid: state.auth.userid,
        isbookmarked: state.blog.isbookmarked,
        isliked: state.blog.isliked,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchParticularBlog: (id, userid) => { dispatch(actions.fetchParticularBlog(id, userid)) },
        onAddBookmark: (userid, blogid) => dispatch(actions.addBookmark(userid, blogid)),
        onAddLike: (userid, blogid) => dispatch(actions.addLike(userid, blogid)),
        onRemoveBookmark: (userid, blogid) => dispatch(actions.removeBookmark(userid, blogid)),
        onRemoveLike: (userid, blogid) => dispatch(actions.removeLike(userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogViewHome))