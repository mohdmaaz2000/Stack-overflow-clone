import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'


import '../ProfilePage/UserPost.css'
import './PostComment.css'
import Avatar from '../../Avatar/Avatar'
import Comment from './Comment'
import { useSelector } from 'react-redux'

const PostComment = () => {
    const id = useParams();
    const users = useSelector((state) => state.userReducer);
    const post = {
        _id: "1",
        userPostedId: "64a12dd985b94d0974bcaf21",
        content: "This is the first post",
        userPosted: "Farhan",
        fileContent: "1688401896815Mohd Maaz 2023.jpg",
        likes: ["64a12dd985b94d0974bcaf21", "64a001cfb16998fefdc77ff5", "649ffb33b8fd9736d36442f6"],
        postedOn: '2023-07-01T10:35:37.639+00:00',
        comments: [{
            _id: "01",
            comment: "Congratulation",
            commentedOn: "2023-07-01T10:35:37.639+00:00",
            userCommented: "64a12dd985b94d0974bcaf21"
        }, {
            _id: "02",
            comment: "Wow Beautiful",
            commentedOn: "2023-07-01T10:35:37.639+00:00",
            userCommented: "64a001cfb16998fefdc77ff5"
        }, {
            _id: "03",
            comment: "Wow keep it up",
            commentedOn: "2023-07-01T10:35:37.639+00:00",
            userCommented: "649ffb33b8fd9736d36442f6"
        }]
    }
    const postUser = users.filter((user) => post.userPostedId === user._id)[0];
    const fileUrl = `${process.env.REACT_APP_SERVER}/UserPost/${post?.fileContent}`;
    const divStyle = {
        background: `url('${fileUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    }
    return (
        <div>
            <div className="post-container" style={{ marginTop: '60px' }}>

                <div className="post-container-header">
                    <h1>User Post</h1>
                </div>


                <div className="post-container-content">
                    <div className="user-post-info">
                        {
                            postUser?.image ? <Link to={`/users/${post.userPostedId}`}>
                                <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${postUser.image}`} alt="User Profile Picture" />
                            </Link>
                                :
                                <div style={{ marginRight: '10px' }}>
                                    <Avatar py="15px" px="12px" bgColor='#009dff' radius='48%' color='white' fSize='25px' >
                                        <Link to={`/users/${post?.userPostedId}`} style={{
                                            textDecoration: 'none',
                                            color: 'white'
                                        }}>
                                            {postUser?.name.charAt(0).toUpperCase()}
                                        </Link>
                                    </Avatar>
                                </div>

                        }

                        <div className="user-post-details">
                            <h2>{post?.userPosted}</h2>
                            <p>Posted {moment(post?.postedOn).fromNow()}</p>
                        </div>
                    </div>
                    <div className="post">
                        {
                            post?.content && <p>{post.content}</p>
                        }
                        {
                            post?.fileContent &&
                            <div className='post-image' style={divStyle} > </div>
                        }
                    </div>
                    <div className="like-comment-section">
                        <div className="like">
                            <button>Like</button>
                            <span>{post?.likes.length} likes</span>
                        </div>
                        <div className="comment">
                            <h3>Comments</h3>
                            <ul>
                                {
                                    post?.comments.length === 0 ? <div className='no-comment'>
                                        No Comments Yet
                                    </div>
                                        :
                                        post?.comments.map((data) => (
                                            <Comment key={data._id} data={data} />
                                        ))
                                }
                            </ul>
                            <form>
                                <input type="text" placeholder="Write a comment..." />
                                <button type="submit">Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComment
