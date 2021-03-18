import React from 'react'
import oglelogo from '../../images/logo.png'
import classes from './Logo.module.css'
import { Link } from 'react-router-dom'

const logo = (props) => (
    <Link to={'/home'} className={classes.Logo} style={{height:props.height}}>
        <img src={oglelogo} alt='OGLE' />
    </Link>
)

export default logo