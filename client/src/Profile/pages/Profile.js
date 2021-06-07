import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import classes from './Profile.module.css'
import * as actions from '../../store/actions/index'
import ProfilePictureUpload from '../../shared/components/FormElements/ProfilePicture'
import UserBlogs from '../components/UserBlogs/UserBlogs'

const Profile = props => {
    const { match, onFetchAllUserInfo } = props
    React.useEffect(() => {
        if (match.params.id) {
            // if (!loadedblog || (loadedblog && loadedblog.id !== +match.params.id)) {
                onFetchAllUserInfo(match.params.id)
            // }
        }
    }, [match])

    const [profession, setProfession] = useState('')
    const [bio, setBio] = useState('')

    const updateprofessionstate = e => {
        setProfession(e.target.value)
    }
    const updatebiostate = e => {
        setBio(e.target.value)
    }
    const updateprofessionclickHandler = () => {
        props.onupdateuserprofessionHandler(profession, props.userid)
    }
    const updatebioclickHandler = () => {
        props.onupdateuserbioHandler(bio, props.userid)
    }
    const changeProfessionHandler = () => {
        setProfession(props.userProfession)
        props.onremoveProfession()
    }
    const changeBioHandler = () => {
        setBio(props.userBio)
        props.onremoveBio()
    }
    const newimageHandler = (image) => {
        props.onupdateuserImageHandler(image.src, props.userid)
    }
    console.log(props.userBlogs)
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profilePerson}>
                <div className={classes.profilePicture}><img src={props.image} alt="dp" /></div>
                {(match.params.id === props.userid) && <ProfilePictureUpload uploadimage={newimageHandler}/>}
            </div>
            <p className={classes.profileUsername}>{props.username}</p>
            {props.userProfession
                ? <div className={classes.profileuserProfession}>
                    <p className={classes.profileProfession}>{props.userProfession}</p>
                    {(match.params.id === props.userid) && 
                        <button onClick={changeProfessionHandler}><FontAwesomeIcon icon={faEdit} /><span className={classes.tooltiptextone}>Edit Profession</span></button>}
                </div>
                : <div className={classes.profileEditProfession}>
                    <input placeholder="Add your Profession" onChange={updateprofessionstate} value={profession}/>
                    <button onClick={updateprofessionclickHandler}>save</button>
                </div>}
            {props.userBio
                ? <div className={classes.profileuserBio}>
                    <p className={classes.profileBio}>{props.userBio} 
                    {(match.params.id === props.userid) && <button onClick={changeBioHandler}><FontAwesomeIcon icon={faEdit} /><span className={classes.tooltiptexttwo}>Edit Bio</span></button>}</p>        
                </div>
                : <div className={classes.profileEditBio}>
                    <p>Bio</p>
                    <input placeholder="Add your Bio" onChange={updatebiostate} value={bio}/>
                    <button onClick={updatebioclickHandler}>save</button>
                </div>}
                <UserBlogs /> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        username: state.auth.Profileusername,
        image: state.auth.Profileimage,
        userProfession: state.auth.profession,
        userBlogs: state.auth.ProfileuserBlogs,
        userBio: state.auth.bio
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchAllUserInfo: (id) => dispatch(actions.fetchAllUserInfo(id)), 
        onupdateuserprofessionHandler: (profession, userid) => dispatch(actions.updateuserprofession(profession, userid)), 
        onupdateuserbioHandler: (bio, userid) => dispatch(actions.updateuserbio(bio, userid)),
        onupdateuserImageHandler: (image, userid) => dispatch(actions.updateuserimage(image, userid)),
        onremoveProfession: () => dispatch({type: 'REMOVE_USER_PROFESSION'}),
        onremoveBio: () => dispatch({type: 'REMOVE_USER_BIO'}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))