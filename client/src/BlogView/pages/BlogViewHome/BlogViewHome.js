import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classes from './BlogViewHome.module.css'
import * as actions from '../../../store/actions/index'

const BlogViewHome = props => {
    const { match, loadedblog, onFetchParticularBlog } = props
    React.useEffect(() => {
        if (match.params.id) {
            if (!loadedblog || (loadedblog && loadedblog.id !== +match.params.id)) {
                onFetchParticularBlog(match.params.id)
            }
        }
    }, [])
    return (
        <div className={classes.Container}>
            {props.loadedblog && <div className={classes.blog}>
                <div className={classes.details}>
                    <div className={classes.authordetails}>
                        <div className={classes.authordp}>
                            <img src={loadedblog.authordp} alt="author" />
                        </div>
                        <p>{loadedblog.authorname}</p>
                    </div>
                    <p>{loadedblog.dateposted} &bull; {loadedblog.minread} min read &#9733;</p>
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
        loadedblog: state.blog.loadedblog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchParticularBlog: (id) => { dispatch(actions.fetchParticularBlog(id)) },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogViewHome))