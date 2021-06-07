import React from 'react'

import classes from './Image.module.css'
// import EditImage from '../EditImage/EditImage'
import ImagePicker from '../../../shared/components/FormElements/ImageUpload'

const Image = (props) => {
    return(
        <div className={classes.imagecontainer}>
            {props.src && props.alt ? 
                <img src={props.src} alt={props.alt}/> : 
                <ImagePicker updateBlog={props.updateBlog}/>
                // <EditImage updateBlog={props.updateBlog}/>
            }
        </div>
    )
} 

export default Image