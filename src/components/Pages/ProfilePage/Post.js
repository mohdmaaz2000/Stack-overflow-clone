import React from 'react'
import { Link } from 'react-router-dom';

import Avatar from '../../Avatar/Avatar';
import moment from 'moment';

const Post = (props) => {
    const { data, currentProfile } = props;
    const fileUrl = `${process.env.REACT_APP_SERVER}/UserPost/${data?.fileContent}`;

    const divStyle = {
        background: `url('${fileUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    }
    return (
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
                    <h2>{data.userPosted}</h2>
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
                    <button>Like</button>
                    <span>{data.likes.length} likes</span>
                </div>
                <div className="comment-section">
                    <Link to={`/post/${data._id}`}><button>Comment</button></Link>
                    <span>{data.comments.length} comments</span>
                </div>
            </div>
        </div>
    )
}

export default Post
