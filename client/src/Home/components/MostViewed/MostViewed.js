import React from 'react'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import classes from './MostViewed.module.css'
import * as actions from '../../../store/actions/index'
import Card from '../../../shared/components/UIElements/Card'


const MostViewed = (props) => {
    const articleClickedHandler = id => {
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
        <div className={classes.MostViewedContainer}>
            <div className={classes.MostViewedContainerTitle}>
                <FontAwesomeIcon icon={faBinoculars} style={{ fontSize: "1.85rem", marginRight: "10px" }} />
                <h3>Most Viewed</h3>
            </div>
            <div className={classes.MostViewedArticleAuthorContainer}>
                <div className={classes.MostViewedArticleContainer}>
                    {props.mostViewedblogs && props.mostViewedblogs.map(blog => {
                        let bannerimage = null
                        for (let element of blog.blog) {
                            if (element.type === 'img') {
                                bannerimage = element.content.src
                                break;
                            }
                        }
                        return (
                            <div className={classes.ArticleContainer}>
                                <div className={classes.ArticleContainerNumber}>0{props.mostViewedblogs.indexOf(blog) + 1}</div>
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
                                    articleBookmarkHandler={articleBookmarkHandler}
                                    authorClicked={authorClickedHandler}
                                    articleClicked={articleClickedHandler} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddBookmark: (userid, blogid) => dispatch(actions.addBookmark(userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MostViewed))