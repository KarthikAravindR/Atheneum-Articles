import React from 'react'

import classes from './Blog.module.css'
import Image from '../Image/Image'
import autosize from 'autosize';

export const componentMapping = {
    img: (content, updateBlog) => <Image {...content} updateBlog={updateBlog} />
}
const Blog = (props) => {
    autosize(document.querySelectorAll('textarea'));
    let view = null
    if (props.type === null) {
        view = (
            <textarea autoFocus
                className={classes.writearea}
                value={props.content}
                placeholder={props.placeholder}
                onChange={e => props.updateBlog(e.target.value)}
                onKeyPress={e => props.handleKeyPress(e, props.id)} 
                onKeyDown={e => props.handleBackspace(e, props.id)}/>
        )
    } else if (props.type === 'title') {
        view = (
            <textarea
                className={classes.title}
                value={props.content}
                placeholder={props.placeholder}
                onKeyPress={e => props.handleKeyPress(e, props.id)}
                onChange={e => props.updateBlog(e.target.value)} />
        )
    } else {
        view = componentMapping[props.type](props.content, props.updateBlog)
    }

    return (
        <div>
            {view}
        </div>
    )
}

export default Blog

