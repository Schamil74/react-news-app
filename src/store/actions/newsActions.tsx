import axios from '../../axios';
import messages from '../../messages';
import { AppThunkAction } from '../types';
import {
    Inews,
    SetAddNewsActionType,
    SetClearNewsActionType,
    SetDeleteNewsActionType,
    SetNewsActionType,
    SetUpdateVerifiedNewsActionType,
    SET_ADD_NEWS,
    SET_CLEAR,
    SET_DELETE_NEWS,
    SET_NEWS,
    SET_UPDATE_VERIFIED_NEWS,
    TItem,
} from '../types/newsTypes';
import { setIsErrorData, setIsFetchingData } from './fetchErrorActions';

export const thunkGetDataByUser = (
    id: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true));
        const response = await axios.get(`/users/${id}/news/`);
        dispatch(setNews(response.data));
        dispatch(setIsFetchingData(false));
    } catch (error) {
        dispatch(setIsFetchingData(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorData({ error: true, msg }));
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }));
        }
    }
};

export const thunkGetData = (
    key?: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true));

        const response = await axios.get(`/news/`);

        dispatch(setNews(response.data));
        dispatch(setIsFetchingData(false));
    } catch (error) {
        dispatch(setIsFetchingData(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorData({ error: true, msg }));
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }));
        }
    }
};

export const thunkDeleteNews = (
    id: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true));

        await axios.delete(`/news/${id}`);

        dispatch(setDeleteNews(id));
        dispatch(setIsFetchingData(false));
    } catch (error) {
        dispatch(setIsFetchingData(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorData({ error: true, msg }));
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }));
        }
    }
};

export const thunkAddNews = (
    newsItem: TItem
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true));

        await axios.post(`/news/`, { ...newsItem });

        dispatch(setAddNews(newsItem));
        dispatch(setIsFetchingData(false));
    } catch (error) {
        dispatch(setIsFetchingData(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorData({ error: true, msg }));
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }));
        }
    }
};

export const thunkUpdateVerifiedNews = (
    id: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true));

        const responseItem = await axios.get(`/news/${id}`);

        await axios.patch(`/news/${id}`, {
            isVerified: !responseItem.data.verified,
        });

        dispatch(setUpdateVerifiedNews(id));
        dispatch(setIsFetchingData(false));
    } catch (error) {
        dispatch(setIsFetchingData(false));
        if (messages[error.message]) {
            const msg = messages[error.message];
            dispatch(setIsErrorData({ error: true, msg }));
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }));
        }
    }
};

export const setNews = (news: Inews): SetNewsActionType => {
    return { type: SET_NEWS, news };
};

export const setDeleteNews = (id: string): SetDeleteNewsActionType => {
    return { type: SET_DELETE_NEWS, id };
};

export const setAddNews = (newsItem: TItem): SetAddNewsActionType => {
    return { type: SET_ADD_NEWS, newsItem };
};

export const setUpdateVerifiedNews = (
    id: string
): SetUpdateVerifiedNewsActionType => {
    return { type: SET_UPDATE_VERIFIED_NEWS, id };
};

export const setClearData = (): SetClearNewsActionType => {
    return {
        type: SET_CLEAR,
    };
};
