import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { deletePost, likePost } from '../../../actions/post';
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
    const fileUrl = `${process.env.REACT_APP_SERVER}/UserPost/${data?.fileContent?.filename}`;
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickRoute = (e) => {
        e.preventDefault();
        setShowComment(!showComment);
    }

    const handleDeletePost = (e) =>{
        e.preventDefault();
        const del = window.confirm("Are you sure want to delete the post");
        if(del){
            dispatch(deletePost(data._id));
        }
    }

    const handleLikePost = (e) =>{
        e.preventDefault();
        if(currentUser === null)
        {
            alert("Login to like the post");
            navigate('/auth');
        }
        else{
            dispatch((likePost(data._id,currentUser?.result._id)));
        }
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
                            <Link to={`/users/${currentProfile._id}`}>
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${currentProfile?.image}`} alt="user profile" />
                                </Link>
                            </>
                            :
                            <div className='user-avatar'>
                                <Link to={`/users/${currentProfile?._id}`} style={{textDecoration:"none"}}>
                                <Avatar py="16px" px="20px" bgColor='#009dff' radius='48%' color='white' fSize='20px'>
                                    {currentProfile?.name.charAt(0).toUpperCase()}
                                </Avatar>
                                </Link>
                            </div>
                    }
                    <div className="user-post-details">
                        <h2>{data?.userPosted}</h2>
                        <p>Posted {moment(data.postedOn).fromNow()}</p>
                    </div>
                </div>
                <div className="post">
                    {data?.content?.length !== 0 &&
                        <p>{data.content}</p>
                    }
                    {
                        data?.fileContent && data?.fileContent?.mimetype?.startsWith("image") &&
                        <div className='post-image' style={divStyle} > </div>
                    }
                    {
                        data?.fileContent && data?.fileContent?.mimetype?.startsWith("video") &&
                        <div className='post-video'>
                            <video src={fileUrl} width="100%" height="100%" controls></video>
                        </div>
                    }
                </div>
                <div className="like-comment">
                    <div className="like" onClick={handleLikePost}>
                        {
                            userLiked === true ?
                                <img src={liked} alt="like" className='like-image-ico' />
                                :
                                <img src={like} alt="like" className='like-image-ico' />
                        }

                        <span>{data?.likes.length}{" "}
                            {
                                data.likes.length <= 1 ? <>like</> : <>likes</>
                            }
                        </span>
                    </div>
                    <div className="comment-section">
                        <img src={comment} alt="comment" className='like-image-ico' onClick={handleClickRoute} />

                        <span>{data?.comments.length}{" "}
                            {
                                data.comments.length <= 1 ? <>comment</> : <>comments</>
                            }
                        </span>
                        {
                            currentUser?.result?._id === data.userPostedId && <div style={{ marginLeft: "inherit", marginTop: "3px" }}>
                                <span className='delete-post-btn' onClick={handleDeletePost}>Delete Post</span>
                            </div>
                        }

                    </div>
                </div>

                {
                    showComment === true && <PostComment post={data} />
                }
            </div>
            <br />
            <hr />
        </>
    )
}

export default Post
