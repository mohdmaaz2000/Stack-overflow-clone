import axios from "axios";

const API = axios.create({
    baseURL:'http://localhost:5000',
    timeout: 1000 * 30,
    validateStatus: (status) => {
        return status >= 200 && status < 500
      }
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile'))
    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).result.token}`
    }
    return req;
});

export const logIn = (authData) => API.post('/user/login',authData);
export const signUp = (authData) =>API.post('/user/signup',authData);
export const fetchAllUsers = () => API.get('/user/allUsers');
export const updateUser = (id,userData) => API.patch(`/user/updateUser/${id}`,userData);

export const postQuestion = (questionData) =>API.post('/questions/Ask',questionData);
export const allQuestion = () => API.get('/questions/getQuestions');
export const deleteQuestion = (id) =>API.delete(`/questions/delete/${id}`);
export const updateVote = (id,value,userId) => API.patch(`/questions/vote/${id}`,{value,userId});


export const postAnswer = (id,noOfAnswer,answerBody,userAnswered,userId) => API.patch(`/answer/post/${id}`,{id,noOfAnswer,answerBody,userAnswered,userId});
export const deleteAnswer = (id,answerId,noOfAnswer) => API.patch(`/answer/delete/${id}`,{answerId,noOfAnswer});


export const askchatbot = (userId,question) => API.post('/chatbot/askQuestion',{userId,question});
export const deletebotQuestion = (userId) =>API.patch('/chatbot/deleteQuestions',{userId});