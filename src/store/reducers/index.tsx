import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './authReducer';
import { fetchErrorReducer } from './fetchErrorReducer';
import { newsReducer } from './newsReducer';

export const rootReducer = combineReducers({
    newsReducer,
    authReducer,
    fetchErrorReducer,
});

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export { store };
