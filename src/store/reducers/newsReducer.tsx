import {
    AppActionTypes,
    INewsAppState,
    SET_ADD_NEWS,
    SET_CLEAR,
    SET_DELETE_NEWS,
    SET_NEWS,
    SET_UPDATE_VERIFIED_NEWS,
} from '../types/newsTypes';

const initialState: INewsAppState = {
    news: [],
};

export function newsReducer(
    state = initialState,
    action: AppActionTypes
): INewsAppState {
    switch (action.type) {
        case SET_NEWS:
            return {
                news: [...action.news],
            };
        case SET_CLEAR:
            return {
                ...initialState,
            };
        case SET_ADD_NEWS:
            return {
                news: [...state.news, action.newsItem],
            };
        case SET_DELETE_NEWS:
            return {
                news: [...state.news.filter(news => news.id !== action.id)],
            };
        case SET_UPDATE_VERIFIED_NEWS:
            return {
                news: [
                    ...state.news.map(news =>
                        news.id !== action.id
                            ? news
                            : { ...news, isVerified: !news.isVerified }
                    ),
                ],
            };
        default:
            return state;
    }
}
