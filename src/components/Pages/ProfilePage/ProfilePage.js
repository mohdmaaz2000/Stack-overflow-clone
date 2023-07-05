import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';

import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import Avatar from '../../Avatar/Avatar';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import UserPost from './UserPost';

import './Profile.css'

const ProfilePage = () => {

    const { id } = useParams();
    const users = useSelector((state) => state.userReducer);
    const currentProfile = users?.filter((user) => user._id === id)[0];
    const currentUser = useSelector((state) => state.currentUserReducer);
    const currentUserData = users?.filter((user) => user._id === currentUser?.result?._id )[0];
    const [Switch,setSwitch] = useState(false);

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            {   currentProfile?.image ? <>
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${currentProfile.image}`} alt="prifile" className='user-details-img'/>
                                </>:
                                <Avatar bgColor={'purple'} color={'white'} fSize={'50px'} px={'40px'} py={'30px'}>{currentProfile?.name.charAt(0).toUpperCase()}
                                </Avatar>

                            }
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id &&(
                                <button type="submit" onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                    {
                        Switch ? (
                            <EditProfileForm currentUser={currentUserData} setSwitch={setSwitch} />
                        ):(<>
                            <ProfileBio currentProfile={currentProfile}/>
                            <UserPost currentUser={currentUser} currentProfile={currentProfile}/>
                            </>
                        )
                    }
                    </>
                </section>
                
            </div>
        </div>
    )
}

export default ProfilePage
