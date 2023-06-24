import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className="side-nav">
        <NavLink to='/' className='side-nav-links' activeClassName='active' >
            <p>Home</p>
        </NavLink>

        <div className="side-nav-div">
            <div><p>PUBLIC</p></div>
            <NavLink to='/Question' className='side-nav-links' activeClassName='active' style={{paddingLeft:'40px'}}>
                <img src={Globe} alt="globe " width={20}/>
                <p style={{paddingLeft:'10px'}}>Question</p>
            </NavLink>

            <NavLink to='/tags' className='side-nav-links' activeClassName='active'>
                <p>Tags</p>
            </NavLink>
            <NavLink to='/users' className='side-nav-links' activeClassName='active'>
                <p>Users</p>
            </NavLink>

        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar
