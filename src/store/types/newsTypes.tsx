export const SET_NEWS = 'SET_NEWS';
export const SET_CLEAR = 'SET_CLEAR';
export const SET_DELETE_NEWS = 'SET_DELETE_NEW';
export const SET_ADD_NEWS = 'SET_ADD_NEW';
export const SET_UPDATE_VERIFIED_NEWS = 'SET_UPDATE_VERIFIED_NEWS';

export interface TItem {
    id: string;
    userId: string | null;
    title: string;
    body: string;
    isVerified: boolean;
    date: Date;
}

export type Inews = Array<TItem>;

export interface INewsAppState {
    news: Inews;
}

export interface SetNewsActionType {
    type: typeof SET_NEWS;
    news: Inews;
}

export interface SetDeleteNewsActionType {
    type: typeof SET_DELETE_NEWS;
    id: string;
}

export interface SetAddNewsActionType {
    type: typeof SET_ADD_NEWS;
    newsItem: TItem;
}

export interface SetUpdateVerifiedNewsActionType {
    type: typeof SET_UPDATE_VERIFIED_NEWS;
    id: string;
}

export interface SetClearNewsActionType {
    type: typeof SET_CLEAR;
}

export type AppActionTypes =
    | SetNewsActionType
    | SetDeleteNewsActionType
    | SetAddNewsActionType
    | SetUpdateVerifiedNewsActionType
    | SetClearNewsActionType;

export type AppConstTypes =
    | typeof SET_CLEAR
    | typeof SET_NEWS
    | typeof SET_DELETE_NEWS
    | typeof SET_ADD_NEWS
    | typeof SET_UPDATE_VERIFIED_NEWS;
