import React from 'react'

import classes from './ActionBar.module.css'
import componentMapping from '../Blog/Blog'

const ActionBar = (props) => {
    return(
        <div className={classes.ActionBar}>
            {console.log(Object.keys(componentMapping))}
            {Object.keys(componentMapping).map(key => (
                <button onClick={() => props.addItem(key, {})}>{key}</button>
            ))}
        </div>
    )
} 

export default ActionBar