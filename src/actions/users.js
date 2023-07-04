import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers();
        dispatch({ type: 'ALL_USERS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, userData);
        dispatch({ type: 'UPDATE_USER', payload: data });
        dispatch(fetchAllUsers());
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, formData);
        if (data.error === true) {
            alert(data.message);
        }
        else {
            dispatch({ type: 'UPDATE_PROFILE', payload: data });
            dispatch(fetchAllUsers());
            alert("updated Successfully");
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteProfile = (id) => async (dispatch) => {
    try {
        const {data} = await api.deleteProfile(id);
        if(data.error === true)
        {
            alert(data.message);
        }
        else{
            dispatch({type:'DELETE_PROFILE',payload:data});
            dispatch(fetchAllUsers());
        }
    } catch (error) {
        console.log(error);
    }
}