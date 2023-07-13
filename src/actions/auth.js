import * as api from '../api'
import { toast } from 'react-toastify';
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            dispatch({ type: 'AUTH', data });
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
            navigate('/');
            toast.success("Signed up successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        if (data.error === true) {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        } else {
            dispatch({ type: 'AUTH', data });
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
            navigate('/');
            toast.success("Logged in successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log(error);
    }
}