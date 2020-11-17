import {
    AuthActionTypes,
    AuthType,
    SET_AUTH,
    SET_OPEN,
} from '../types/authTypes';

const initialState: AuthType = {
    auth: {
        'id': null,
        'isAdmin': false,
        'name': null,
    },
    isOpen: false,
};

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthType {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: {
                    ...action.auth,
                },
            };
        case SET_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
            };
        default:
            return state;
    }
}
