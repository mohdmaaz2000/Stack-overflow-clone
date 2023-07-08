import './App.css';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router
} from "react-router-dom";
import AllRoutes from './components/Routes/AllRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { allPost } from './actions/post';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(allPost());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </>
  );
}

export default App;