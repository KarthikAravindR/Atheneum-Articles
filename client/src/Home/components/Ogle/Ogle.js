import React from 'react'
import { withRouter } from 'react-router'

import classes from './Ogle.module.css'
import BannerCard from '../../../shared/components/UIElements/BannerCard'
import Card from '../../../shared/components/UIElements/Card'

const Ogle = (props) => {
    const allblogs = [...props.blogs]
    let bannerblog = allblogs.shift()
    let bannerimage = null
    for (let element of bannerblog.blog) {
        if (element.type === 'img') {
            bannerimage = element.content.src
            break;
        }
    }
    console.log(bannerblog)
    console.log(allblogs)
    const articleClickedHandler = id => {
        props.history.push(`/blogview/${id}`)
    }
    return (
        <div className={classes.OgleBanner}>
            <div className={classes.OgleBannerMain}>
                <BannerCard
                    key={bannerblog.id}
                    id={bannerblog.id}
                    title={bannerblog.blog[0].content}
                    authorname={bannerblog.authorname}
                    authordp={bannerblog.authordp}
                    bannerimage={bannerimage}
                    minread={bannerblog.minread}
                    dateposted={bannerblog.dateposted}
                    articleClicked={articleClickedHandler}/>
            </div>
            <div className={classes.OgleBannercards}>
                {allblogs.map(blog => {
                    let bannerimage = null
                    for (let element of blog.blog) {
                        if (element.type === 'img') {
                            bannerimage = element.content.src
                            break;
                        }
                    }
                    return(
                        <Card 
                            key={blog.id}
                            id={blog.id}
                            title={blog.blog[0].content}
                            authorname={blog.authorname}
                            authordp={blog.authordp}
                            bannerimage={bannerimage}
                            minread={blog.minread}
                            dateposted={blog.dateposted} 
                            articleClicked={articleClickedHandler}/>
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(Ogle)