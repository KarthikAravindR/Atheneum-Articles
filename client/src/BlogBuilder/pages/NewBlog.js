import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import classes from './NewBlog.module.css'
import Blog from '../Components/Blog/Blog'
import ActionBar from '../Components/ActionBar/ActionBar';
import * as actions from '../../store/actions/index'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'


const NewBlog = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [blogs, setBlogs] = useState([
        {
            type: "title",
            content: "",
            placeholder: "Title",
            id: uuid()
        },
        {
            type: null,
            content: '',
            placeholder: "Write your Story...",
            id: uuid()
        },
        {
            type: "img",
            content: {},
            id: uuid()
        },
    ])
    const addBlog = (id, type, content) => {
        setBlogs(state => {
            let index = state.findIndex(item => item.id === id)
            index = index + 1
            let filterarray = state.filter(element => {
                if (element.type === null) {
                    return element.content !== ''
                }
                return element
            })
            let secondfilterarray = filterarray.filter(element => {
                if (element.type === 'img') {
                    return element.content.src !== undefined
                }
                return element
            })
            secondfilterarray.splice(index, 0, { type, content, placeholder: '', id: uuid() }, { type: "img", content: {}, id: uuid() })
            return secondfilterarray
        })
    }
    const updateBlog = (id, newContent) => {
        setBlogs(state => {
            const blogIndex = state.findIndex(item => item.id === id)
            const newState = [...state]
            newState[blogIndex].content = newContent
            newState.map(e => {
                if (e.type === null && e.content !== '') {
                    e.placeholder = ''
                }
                return e
            })
            if (newState[blogIndex].type === 'img') {
                newState.push({
                    type: null,
                    content: "",
                    placeholder: '',
                    id: uuid()
                }, {
                    type: "img",
                    content: {
                    },
                    id: uuid()
                })
            }
            return newState
        })
    }
    const handleKeyPress = (e, id) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addBlog(id, null, "")
        }
    }
    const handleBackspace = (e, id) => {
        if (e.key === 'Backspace') {
            const blogIndex = blogs.findIndex(item => item.id === id)
            const newState = [...blogs]
            if (newState[blogIndex].content === '') {
                newState.splice(blogIndex, 1)
            }
            setBlogs(newState)
        }
    }
    const deleteImageHandler = (id) => {
        const imgIndex = blogs.findIndex(item => item.id === id)
        const newState = [...blogs]
        newState.splice(imgIndex, 1)
        setBlogs(newState)
    }
    const publishHandler = () => {
        const newState = [...blogs]
        let date = new Date()
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dateposted = date.getDate().toString() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear().toString()
        let minread = 0
        let filterarray = newState.filter(element => {
            if (element.type === null) {
                return element.content !== ''
            }
            return element
        })
        let secondfilterarray = filterarray.filter(element => {
            if (element.type === 'img') {
                return element.content.src !== undefined
            }
            return element
        })
        secondfilterarray.map(element => {
            if (element.type === null) {
                minread = minread + 1
            }
            return element
        })
        let bannerimage = ''
        for (let element of secondfilterarray) {
            if (element.type === 'img') {
                bannerimage = element.content.src
                break;
            }
        }
        console.log("array => ",secondfilterarray)
        console.log("title => ",secondfilterarray[0].content)
        console.log("bannerimage => ",bannerimage)
        props.onPublishBlog(
            props.token, 
            props.userid,
            props.username, 
            props.image, 
            dateposted, 
            minread, 
            secondfilterarray, 
            secondfilterarray[0].content, 
            bannerimage
            )
        // setTimeout(() => {
        //      props.loading && props.history.push('/')
        // }, 5000)
    }
    return (
        <div className={classes.Blog}>
            {/* <HomeHeader /> */}
            <div className={classes.storyarea}>
                {blogs.map(blog => (
                    <Blog
                        key={blog.id}
                        id={blog.id}
                        type={blog.type}
                        content={blog.content}
                        placeholder={blog.placeholder}
                        updateBlog={(newContent) => updateBlog(blog.id, newContent)}
                        handleKeyPress={handleKeyPress}
                        deleteImageHandler={() => deleteImageHandler(blog.id)}
                        handleBackspace={handleBackspace} />
                ))}
                <ActionBar addBlog={addBlog} />
                <button 
                    onClick={publishHandler} 
                    disabled={blogs[0].content.length === 0 || blogs[1].content.length === 0}
                    className={classes.publish}>
                        {props.loading ? <LoadingSpinner /> : "Publish"}
                </button>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        email: state.auth.email,
        username: state.auth.username,
        token: state.auth.token,
        image: state.auth.image,
        loading: state.blog.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPublishBlog: (token, userid, username, image, dateposted, minread, secondfilterarray, title, bannerimage) => (dispatch(actions.publishBlog(token, userid, username, image, dateposted, minread, secondfilterarray, title, bannerimage))),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlog))


// let filterarray = state.filter(element => {
//     return element.content !== ''
// })
// console.log(filterarray)
// let secondfilterarray = filterarray.filter(element => {
//     if(element.type === 'img'){
//         return element.content.src !== undefined
//     }
//     return element
// })