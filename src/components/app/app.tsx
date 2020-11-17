import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import Main from '../../pages/main';
import {
    setAuthOpen,
    thunkIsAuth,
    thunkLogOut,
} from '../../store/actions/authActions';
import { AppThunkDispatch, RootState } from '../../store/types';
import Error from '../error/error';
import Loader from '../loader/loader';
import Login from '../login/login';
import NewsList from '../newsList/newsList';

const App: FC = () => {
    const authReducer = (state: RootState) => state.authReducer;
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer;
    const thunkDispatch: AppThunkDispatch = useDispatch();
    const dispatch: Dispatch = useDispatch();
    const { isErrorAuth, isErrorData } = useSelector(fetchErrorReducer);
    const { isFetchingAuth } = useSelector(fetchErrorReducer);
    const { auth } = useSelector(authReducer);

    useEffect(() => {
        if (!auth.id) {
            thunkDispatch(thunkIsAuth());
        }
    }, [auth.id, thunkDispatch]);

    const handleLogOut = () => {
        dispatch(setAuthOpen(false));
        thunkDispatch(thunkLogOut());
    };

    const handleLogin = () => {
        dispatch(setAuthOpen(true));
    };

    return (
        <>
            <header className="app__header app-header">
                <div className="app__container container">
                    <div className="nav">
                        <NavLink
                            exact
                            to={'/'}
                            className="nav__link"
                            activeClassName="is-active">
                            Главная
                        </NavLink>
                        <NavLink
                            to={'/news'}
                            className="nav__link"
                            activeClassName="is-active">
                            Новости
                        </NavLink>
                    </div>
                    <button
                        className="btn btn_wide app__btn"
                        onClick={auth.id ? handleLogOut : handleLogin}>
                        {auth.id ? 'Выйти' : 'Войти'}
                    </button>
                </div>
            </header>
            <main className="app__main app-main">
                <div className="app__container container">
                    {isFetchingAuth ? (
                        <Loader modificator="fixed" />
                    ) : (
                        <>
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route path="/news" component={NewsList} />
                                <Redirect to="/" />
                            </Switch>
                            <Login />
                            <Error error={{ isErrorAuth, isErrorData }} />
                        </>
                    )}
                </div>
            </main>
            <footer className="app__footer app-footer">
                <div className="app__container container">
                    <address className="app__author">
                        <a
                            rel="noreferrer"
                            href="https://kot6eremot.tk/"
                            target="_blank">
                            React Developer Minibaev Shamil
                        </a>
                    </address>
                </div>
            </footer>
        </>
    );
};

export default App;
