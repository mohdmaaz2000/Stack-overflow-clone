import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../ProfilePage/UserPost.css'
import './AllPost.css'
import Post from './Post'

const AllPost = () => {

  const currentUser = useSelector((state)=>state.currentUserReducer);
  const userposts = useSelector(state=>state.postReducer);
  const posts = userposts?.data;
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

      {posts?.length !== 0 && (
        <div className="post-container">

          <div className="post-container-header">
            <div className='upload-post-div'>
              <button onClick={handlePost} className='user-submit-btn'>Upload a post</button>
            </div>
            <h1>Recent Posts</h1>
          </div>
          {
            posts && posts?.map((element) => (
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

