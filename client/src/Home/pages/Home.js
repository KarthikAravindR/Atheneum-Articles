import React from 'react'
import { connect } from 'react-redux'

import './Home.css'
import * as actions from '../../store/actions/index'
import Atheneum from '../components/Atheneum/Atheneum'
import MostViewed from '../components/MostViewed/MostViewed'
import Articles from '../components/Articles/Articles'
import SkeletonOne from '../../shared/components/Skeleton/SkeletonOne'
import SkeletonTwo from '../../shared/components/Skeleton/SkeletonTwo'

const Home = (props) => {
    const { onFetchAllBlogs } = props
    React.useEffect(() => {
        onFetchAllBlogs()
    }, [onFetchAllBlogs])

    const allblogs = [...props.blogs]
    let mostViewedblogs = [...props.blogs]
    let bannerblog = allblogs.pop()
    let lastfourcards = allblogs.splice(-4)
    let articlecards = allblogs.splice(-5)
    mostViewedblogs.sort((a, b) => {
        return b.views - a.views;
    });
    mostViewedblogs = mostViewedblogs.slice(0, 6)
    return (
        <div>
            {props.homepageloading ?
                <div className="skeleton_container">
                    <div className="skeleton_container_one">
                        <SkeletonOne />
                    </div>
                    <div className="skeleton_container_two">
                        <SkeletonTwo />
                    </div>
                </div> :
                <div>
                    {props.blogs[0] &&
                        <div className="HomeContainer">
                            <Atheneum
                                bannerblog={bannerblog}
                                lastfourcards={lastfourcards} />
                            <MostViewed
                                mostViewedblogs={mostViewedblogs} />
                            <Articles
                                articlecards={articlecards} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        blogs: state.blog.blogs,
        homepageloading: state.blog.homepageloading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchAllBlogs: () => (dispatch(actions.fetchAllBlogs())),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)