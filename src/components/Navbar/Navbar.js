import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import search from '../../assets/search.svg'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import jwtDecode from 'jwt-decode';

const Navbar = () => {

  const dispatch = useDispatch();

  let User = useSelector((state) => (state.currentUserReducer));
  const users = useSelector((state) => state.userReducer);
  const [currentProfile, setCurrentProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
    dispatch(setCurrentUser(null));
  }
  useEffect(() => {
    if (User !== null) {
      setCurrentProfile(users?.filter((user) => user._id === User.result._id)[0]);
    }
  }, [User,users]);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <nav className='main-nav'>
      <div className="navbar">
        <Link to="/" className='nav-item nav-logo'>
          <img src={logo} alt="logo" width="150" />
        </Link>
        <Link to="/chatbot" className='nav-item nav-btn'>Ask chatbot</Link>
        <Link to="/" className='nav-item nav-btn'>About</Link>
        <Link to="/" className='nav-item nav-btn'>For Teams</Link>

        <form >
          <input type="text" placeholder='Search...' />
          <img src={search} alt="Search" width={18} className='search-icon' />
        </form>

        {User === null ?
          <Link to='/auth' className='nav-item nav-links'>Login</Link>
          :
          <>
            {
              currentProfile?.image ? <>
                <Link to={`/users/${User?.result?._id}`} >
                  <img src={`http://localhost:5000/Profilephoto/${currentProfile.image}`} className='profilePic' alt='img' />
                </Link>
              </> :
                <>
                  <Avatar py="7px" px="10px" bgColor='#009dff' radius='48%' color='white'><Link to={`/users/${User?.result?._id}`} style={{ textDecoration: 'none', color: 'white' }}>{User?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>
                </>
            }
            <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
