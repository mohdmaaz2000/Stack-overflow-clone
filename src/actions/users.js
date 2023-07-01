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