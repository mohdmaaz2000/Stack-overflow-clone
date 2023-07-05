import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

import Avatar from '../../Avatar/Avatar';
import PostComment from './PostComment';
import like from '../../../assets/like.svg'
import liked from '../../../assets/like-solid.svg'
import comment from '../../../assets/comment-post.svg'
import './PostComment.css'


const Post = (props) => {
    const { data } = props;
    const users = useSelector((state) => state.userReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const userLiked = data.likes.includes(currentUser?.result?._id);
    const currentProfile = users?.filter((user) => data.userPostedId === user._id)[0];
    const fileUrl = `${process.env.REACT_APP_SERVER}/UserPost/${data?.fileContent}`;
    const [showComment,setShowComment] = useState(false);

    const handleClickRoute = (e) => {
        e.preventDefault();
        setShowComment(!showComment);
    }
    const divStyle = {
        background: `url('${fileUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    }
    return (
        <>
            <div className="post-container-content">
                <div className="user-post-info">
                    {
                        currentProfile?.image ?
                            <>
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${currentProfile?.image}`} alt="user profile" />
                            </>
                            :
                            <div className='user-avatar'>
                                <Avatar py="16px" px="20px" bgColor='#009dff' radius='48%' color='white' fSize='20px'>
                                    {currentProfile?.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </div>
                    }
                    <div className="user-post-details">
                        <h2>{data?.userPosted}</h2>
                        <p>Posted {moment(data.postedOn).fromNow()}</p>
                    </div>
                </div>
                <div className="post">
                    {data?.content &&
                        <p>{data.content}</p>
                    }
                    {
                        data?.fileContent &&
                        <div className='post-image' style={divStyle} > </div>
                    }
                </div>
                <div className="like-comment">
                    <div className="like">
                        {
                            userLiked === true ?
                                <img src={like} alt="like" className='like-image-ico' />
                                :
                                <img src={liked} alt="like" className='like-image-ico' />
                        }

                        <span>{data?.likes.length}{" "}
                            {
                                data.likes.length === 1 ? <>like</> : <>likes</>
                            }
                        </span>
                    </div>
                    <div className="comment-section">
                        <img src={comment} alt="comment" className='like-image-ico' onClick={handleClickRoute} />

                        <span>{data?.comments.length}{" "}
                            {
                                data.comments.length === 1 ? <>comment</> : <>comments</>
                            }
                        </span>
                    </div>
                </div>

                {
                    showComment === true && <PostComment />
                }
            </div>
            <br />
            <hr />
        </>
    )
}

export default Post
