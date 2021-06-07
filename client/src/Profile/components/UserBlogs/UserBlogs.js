import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classes from './UserBlogs.module.css'
import Card from '../../../shared/components/UIElements/Card'

const UserBlogs = props => {
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
        <div className={classes.userBlogContainer}>
            <div className={classes.userBlogAuthorContainer}>
                <div className={classes.userBlogHeading}>STORIES</div>
                <div className={classes.userBlogimageContainer}>
                    {props.userBlogs && props.userBlogs.map(blog => {
                        let bannerimage = null
                        for (let element of blog.blog) {
                            if (element.type === 'img') {
                                bannerimage = element.content.src
                                break;
                            }
                        }
                        return (
                            <div className={classes.userBlogCardContainer}>
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        userBlogs: state.auth.ProfileuserBlogs,
        blogs: state.blog.blogs
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserBlogs))
