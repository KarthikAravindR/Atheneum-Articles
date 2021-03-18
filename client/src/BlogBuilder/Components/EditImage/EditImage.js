import React from 'react'

// import classes from './EditImage.module.css'

const EditImage = (props) => {
    const [src, setSrc] = React.useState('')
    const [alt, setAlt] = React.useState('')
    const updateImageHandler = () => {
        console.log("called 1")
        props.updateBlog({src, alt})
    }
    return(
        <div>
            <input placeholder="Add Src" value={src} onChange={e => setSrc(e.target.value)}/>
            <input placeholder="Add Alt" value={alt} onChange={e => setAlt(e.target.value)}/>
            <button onClick={updateImageHandler}>Submit</button>
        </div>
    )
} 

export default EditImage