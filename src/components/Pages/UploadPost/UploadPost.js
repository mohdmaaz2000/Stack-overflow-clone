import React, { useState } from 'react'
import './UploadPost.css'

const UploadPost = () => {
    const [content, setContent] = useState('');
    const [image,setImage] = useState('');

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setContent(content + "\n");
        }
    }

    const handlePostSubmit = (e)=>{
        e.preventDefault();
        
        if(image ==='' && content==='')
        {
            alert("Can't post an empty post");
        }

    }
    return (
        <div className='upload-post-container'>
            <form enctype="multipart/form-data" onSubmit={handlePostSubmit}>
                <div className="new-post-form-container">
                    <h1>Upload Post</h1>
                    <label for="new-post-image">
                        <h4>Image</h4>
                        <input type="file" id="new-post-image" accept="image/*" onChange={(e)=>setImage(e.target.value[0])}/>
                    </label>
                    <label for="new-post-description">
                        <h4>Description</h4>
                        <textarea id="new-post-description" cols="25" rows="5" onChange={(e) => setContent(e.target.value)} onKeyPress={handleEnter}></textarea>
                    </label>
                    <input type="submit" value="Post" className='new-post-btn'/>
                </div>
            </form>
        </div>
    )
}

export default UploadPost
