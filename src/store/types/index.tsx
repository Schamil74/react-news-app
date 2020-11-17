import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { AuthActionTypes, AuthConstTypes } from './authTypes';
import {
    FetchErrorActionTypes,
    FetchErrorTypeConstTypes,
} from './fetchErrorTypes';
import { AppActionTypes, AppConstTypes } from './newsTypes';

type ActionTypes = AppActionTypes | AuthActionTypes | FetchErrorActionTypes;

type ActionConstTypes =
    | AuthConstTypes
    | AppConstTypes
    | FetchErrorTypeConstTypes;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    any,
    Action<ActionTypes>
>;

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<ActionConstTypes>
>;
