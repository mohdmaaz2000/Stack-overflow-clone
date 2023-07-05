import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../ProfilePage/UserPost.css'
import './AllPost.css'
import Post from './Post'

const AllPost = () => {

  const currentUser = useSelector((state)=>state.currentUserReducer);
  const posts = [{
    _id: "1",
    userPostedId: "64a12dd985b94d0974bcaf21",
    content: "This is the first post",
    userPosted: "Farhan",
    fileContent: "1688401896815Mohd Maaz 2023.jpg",
    likes: ["64a12dd985b94d0974bcaf21", "64a001cfb16998fefdc77ff5", "649ffb33b8fd9736d36442f6"],
    postedOn: '2023-07-01T10:35:37.639+00:00',
    comments: []
  }, {
    _id: "2",
    userPostedId: "64a12dd985b94d0974bcaf21",
    userPosted: "Farhan",
    fileContent: "1688466818607wallpaper 1.jpg",
    likes: ["64a12dd985b94d0974bcaf21", "649ffb33b8fd9736d36442f6"],
    postedOn: '2023-07-03T10:35:37.639+00:00',
    comments: []
  }, {
    _id: "3",
    userPostedId: "64a12dd985b94d0974bcaf21",
    content: "I am happy to share this",
    userPosted: "Farhan",
    likes: ["649ffb33b8fd9736d36442f6"],
    postedOn: '2023-07-03T10:35:37.639+00:00',
    comments: []
  }];

  const navigate = useNavigate();
  const handlePost = (e)=>{
    e.preventDefault();
    if(currentUser === null)
    {
      alert('Please Login first');
      navigate('/auth');
    }
    else{
      navigate('/uploadPost');
    }
  }
  return (
    <div style={{ marginTop: '60px' }}>
      {posts.length !== 0 && (
        <div className="post-container">

          <div className="post-container-header">
            <div className='upload-post-div'>
              <button onClick={handlePost} className='user-submit-btn'>Upload a post</button>
            </div>
            <h1>Posts</h1>
          </div>
          {
            posts.map((element) => (
              <Post key={element._id} data={element} />
            ))
          }
        </div>
      )
      }
    </div>
  )
}

export default AllPost

