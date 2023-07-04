import React, { useState } from 'react'
import { deleteProfile, updateProfile, updateUser } from '../../../actions/users';
import { useDispatch } from 'react-redux';

const EditProfileForm = (props) => {
  const { currentUser, setSwitch } = props;
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    if (tags === '') {
      dispatch(updateUser(currentUser?._id, { name, about, tags: currentUser?.tags }));
    }
    else {
      dispatch(updateUser(currentUser?._id, { name, about, tags }));
    }
    setSwitch(false);
    alert("Updated Successfully");
  }

  const handleImgSubmit = (e) => {
    e.preventDefault();
    if (image === '') {
      alert("Please upload the image first");
    } else {
      let formData = new FormData();
      formData.append('image', image);
      dispatch(updateProfile(currentUser?._id, formData));
      setSwitch(false);
    }
  }

  const handleDeleteProfile = (e)=>{
    e.preventDefault();
    dispatch(deleteProfile(currentUser?._id));
    setSwitch(false);
  }

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>

      <form className="edit-profile-form" onSubmit={handleEdit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="about">
          <h3>About Me</h3>
          <textarea cols="30" rows="10" value={about} id="about" onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags seperated by one space</p>
          <input type="text" id="tags" onChange={(e) => setTags(e.target.value.split(' '))} />
        </label>
        <br />
        <input type="submit" value="Save Profile" className='user-submit-btn' />
        <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
      </form>
      <br />


      <form className='edit-profile-form' onSubmit={handleImgSubmit}>
        <label htmlFor="profileImg">
          <h3 style={{ marginBottom: '5px' }}>{currentUser.image ? <>Edit Profile Photo</> :<>Upload Profile Photo</>}</h3>
          <input type="file" name="image" id="profileImg" className='form-img' onChange={(e) => {
            setImage(e.target.files[0]);
          }}  accept=".jpg,.png,.jpeg,"/>
        </label>
        {
          currentUser.image ?
          (<div style={{display:'flex'}}>
          <input type="submit" value="Edit Profile" className='user-submit-btn'style={{marginRight:'5px'}}/>
          <button type='button' className='user-submit-btn' onClick={handleDeleteProfile} style={{marginLeft:'5px'}}>Delete Profile Photo</button> 
          </div>)
           : 
           (<input type="submit" value="Upload Profile" className='user-submit-btn' style={{ display: 'block' }} />)
        }
        
      </form>

    </div>
  )
}

export default EditProfileForm
