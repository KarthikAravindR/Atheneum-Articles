import React from 'react'
import { connect } from 'react-redux'

import './Home.css'
// import HomeHeader from '../../shared/components/Navigation/HomeHeader'
import * as actions from '../../store/actions/index'
import Ogle from '../components/Ogle/Ogle'
import Trending from '../components/Trending/Trending'
import Articles from '../components/Articles/Articles'
// import BannerCard from '../../shared/components/UIElements/BannerCard'
// import Card from '../../shared/components/UIElements/Card'
// import BlogBuilder from '../../BlogBuilder/pages/NewBlog/NewBlog'

const Home = (props) => {
    const {onFetchAllBlogs} = props
    React.useEffect(() => {
        onFetchAllBlogs()
    }, [onFetchAllBlogs])

    console.log(props.blogs)
    return(
        <div>
            {/* <HomeHeader /> */}
            {props.blogs[0] && <div className="HomeContainer">
                <Ogle blogs={props.blogs}/>
                <Trending />
                <Articles /> 
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