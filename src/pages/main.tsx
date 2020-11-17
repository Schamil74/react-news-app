import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

const Main = () => {
    const authReducer = (state: RootState) => state.authReducer;
    const { auth } = useSelector(authReducer);

    return (
        <>
            <h1 className="app__name">
                Привет, {auth.id ? auth.name : 'Гость'}
            </h1>
        </>
    );
};

export default Main;
