import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Questions from './QuestionsList';
import './MainHomePage.css'
import search from '../../assets/search.svg';

const MainHomePage = () => {
  let user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const questionList = useSelector(state => state.questionReducer);
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const handleClick = () => {
    if (user === null) {
      alert("Please login first");
      navigate('/auth')
    }
    else {
      navigate('/AskQuestion');
    }
  }
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions </h1> : <h1>All Questions</h1>
        }
        <button onClick={handleClick} className='ask-btn'>Ask Question</button>
      </div>
      {
        width < 600 && <div className='question-search'>
          <form >
            <img src={search} alt="Search" width={18} className='search-question-icon'/>
            <input type="text" placeholder='Search...' ></input>
          </form>

        </div>
      }
      <div>
        {
          questionList.length === 0 ?
            <h3 style={{ textAlign: 'center' }}>Loading...</h3> :
            <>
              <p>{questionList.data.length} questions </p>
              <>
                {
                  questionList.data.toReversed().map((element) => (
                    <Questions question={element} key={element._id} />
                  ))
                }
              </>
            </>
        }
      </div>
    </div>
  )
}

export default MainHomePage
