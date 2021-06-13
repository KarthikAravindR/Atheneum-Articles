import React from 'react'
import SkeletonTwo from '../Skeleton/SkeletonTwo'
import './ProfileSkeleton.scss'

const ProfileSkeleton = props => {
    return (
        <div className="profile_Skeleton_Container">        
            <div className="profileSkeleton"></div>
            <SkeletonTwo />
        </div>
    )
}

export default ProfileSkeleton