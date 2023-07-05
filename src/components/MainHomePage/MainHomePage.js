import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


import Questions from './QuestionsList';
import './MainHomePage.css'
const MainHomePage = () => {
  let user = useSelector((state)=>state.currentUserReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const questionList = useSelector(state=>state.questionReducer);

  
  const handleClick = ()=>{
    if(user === null)
    {
      alert("Please login first");
      navigate('/auth')
    }
    else{
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
      
      <div>
        {
          questionList.length === 0?
          <h3 style={{textAlign:'center'}}>Loading...</h3>:
          <>
          <p>{questionList.data.length} questions </p> 
          <>
          {
            questionList.data.toReversed().map((element)=>(
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
