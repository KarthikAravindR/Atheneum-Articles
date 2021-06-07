import React from 'react'
import { connect } from 'react-redux'

import './Home.css'
// import HomeHeader from '../../shared/components/Navigation/HomeHeader'
import * as actions from '../../store/actions/index'
import Atheneum from '../components/Atheneum/Atheneum'
import MostViewed from '../components/MostViewed/MostViewed'
import Articles from '../components/Articles/Articles'
// import BannerCard from '../../shared/components/UIElements/BannerCard'
// import Card from '../../shared/components/UIElements/Card'
// import BlogBuilder from '../../BlogBuilder/pages/NewBlog/NewBlog'

const Home = (props) => {
    const {onFetchAllBlogs} = props
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
    mostViewedblogs = mostViewedblogs.slice(0,6)
    console.log(mostViewedblogs)
    return(
        <div>
            {/* <HomeHeader /> */}
            {props.blogs[0] && <div className="HomeContainer">
                <Atheneum 
                    bannerblog={bannerblog}
                    lastfourcards={lastfourcards} />
                <MostViewed 
                    mostViewedblogs={mostViewedblogs} />
                <Articles 
                    articlecards={articlecards} /> 
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        blogs: state.blog.blogs
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchAllBlogs: () => (dispatch(actions.fetchAllBlogs())),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)