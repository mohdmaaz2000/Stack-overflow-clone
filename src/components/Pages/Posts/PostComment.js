import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'


import '../ProfilePage/UserPost.css'
import './PostComment.css'
import Avatar from '../../Avatar/Avatar'
import Comment from './Comment'
import { useSelector } from 'react-redux'

const PostComment = () => {
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

    return (

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

    )
}

export default PostComment
