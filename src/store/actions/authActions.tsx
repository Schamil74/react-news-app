import axios from '../../axios';
import messages from '../../messages';
import { setClearData } from '../actions/newsActions';
import { AppThunkAction } from '../types';
import {
    AuthTypeContent,
    SetAuthActionType,
    SetAuthOpenActionType,
    SET_AUTH,
    SET_OPEN,
} from '../types/authTypes';
import { setIsErrorAuth, setIsFetchingAuth } from './fetchErrorActions';

export const thunkLogin = (id: string): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true));
        const responseAuth = await axios.get(`/users/${id}`);

        const auth: AuthTypeContent = {
            id: null,
            isAdmin: false,
            name: null,
        };

        if (responseAuth.data.id === id) {
            auth.id = id;
            auth.name = responseAuth.data.name;
        }

        if (responseAuth.data.isAdmin) {
            auth.isAdmin = true;
        }

        await axios.put(`/auth/`, auth);

        dispatch(setAuth(auth));
        dispatch(setIsFetchingAuth(false));
    } catch (error) {
        dispatch(setIsFetchingAuth(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorAuth({ error: true, msg }));
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }));
        }
    }
};

export const thunkIsAuth = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true));

        const response = await axios.get(`/auth/`);

        dispatch(setAuth(response.data));
        dispatch(setIsFetchingAuth(false));
    } catch (error) {
        dispatch(setIsFetchingAuth(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorAuth({ error: true, msg }));
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }));
        }
    }
};

export const thunkLogOut = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true));
        const responseRegister = await axios.post(`/auth/`, {
            id: null,
            isAdmin: false,
            name: null,
        });
        dispatch(setAuth(responseRegister.data.data));
        dispatch(setClearData());
        dispatch(setIsFetchingAuth(false));
    } catch (error) {
        dispatch(setIsFetchingAuth(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorAuth({ error: true, msg }));
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }));
        }
    }
};

export function setAuth(auth: AuthTypeContent): SetAuthActionType {
    return {
        type: SET_AUTH,
        auth,
    };
}

export function setAuthOpen(isOpen: boolean): SetAuthOpenActionType {
    return {
        type: SET_OPEN,
        isOpen,
    };
}
