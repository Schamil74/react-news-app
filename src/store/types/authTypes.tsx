export const SET_AUTH = 'SET_AUTH';
export const SET_OPEN = 'SET_OPEN';

export interface AuthTypeContent {
    id: string | null;
    isAdmin: boolean;
    name: string | null;
}

export interface AuthType {
    auth: AuthTypeContent;
    isOpen: boolean;
}

export interface SetAuthActionType {
    type: typeof SET_AUTH;
    auth: AuthTypeContent;
}

export interface SetAuthOpenActionType {
    type: typeof SET_OPEN;
    isOpen: boolean;
}

export type AuthActionTypes = SetAuthActionType | SetAuthOpenActionType;

export type AuthConstTypes = typeof SET_AUTH | typeof SET_OPEN;
