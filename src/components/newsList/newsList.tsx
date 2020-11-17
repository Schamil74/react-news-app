import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
    thunkAddNews,
    thunkDeleteNews,
    thunkGetData,
    thunkGetDataByUser,
    thunkUpdateVerifiedNews,
} from '../../store/actions/newsActions';
import { AppThunkDispatch, RootState } from '../../store/types';
import { Inews, TItem } from '../../store/types/newsTypes';
import withModificator from '../../withClass';
import Loader from '../loader/loader';
import Search from '../search/search';

const blockClassName = 'news';

let schema = yup.object().shape({
    newsitemtitle: yup.string().required('Заголовок не должен быть пустым'),
    newsitembody: yup.string().required('Тело новости не должно быть пустым'),
});

const NewsList = (props: { className: any }) => {
    const { className } = props;
    const thunkDispatch: AppThunkDispatch = useDispatch();
    const newsReducer = (state: RootState) => state.newsReducer;
    const authReducer = (state: RootState) => state.authReducer;
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer;
    const { isFetchingData } = useSelector(fetchErrorReducer);
    const { auth } = useSelector(authReducer);
    const { news } = useSelector(newsReducer);

    const [touchedSearch, setTouchedSearch] = useState<boolean>(false);

    const [filteredOnSearch, setFilteredOnSearch] = useState<Inews>(news);

    const {
        register,
        handleSubmit,
        errors,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: {
        newsitemtitle: string;
        newsitembody: string;
    }) => {
        const item = {
            id: 'user' + new Date().getTime().toString(),
            userId: auth.id,
            title: data.newsitemtitle,
            body: data.newsitembody,
            isVerified: false,
            date: new Date(),
        };

        thunkDispatch(thunkAddNews(item));
    };

    const onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value.trim();

        value !== '' ? setTouchedSearch(true) : setTouchedSearch(false);

        setFilteredOnSearch(
            news.filter((newsItem: TItem) => {
                return (
                    newsItem.title
                        .toUpperCase()
                        .includes(value.toUpperCase()) ||
                    newsItem.body.toUpperCase().includes(value.toUpperCase())
                );
            })
        );
    };

    const handleRemove = (id: string) => {
        thunkDispatch(thunkDeleteNews(id));
    };

    const handleApprove = (id: string) => {
        thunkDispatch(thunkUpdateVerifiedNews(id));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        if (auth.id && !auth.isAdmin) {
            thunkDispatch(thunkGetDataByUser(auth.id));
        } else if (auth.id && auth.isAdmin) {
            thunkDispatch(thunkGetData('admin'));
        } else {
            thunkDispatch(thunkGetData());
        }
    }, [auth.id, auth.isAdmin, thunkDispatch]);

    useEffect(() => {
        if (news) {
            if (auth.id && auth.isAdmin) {
                setFilteredOnSearch(
                    news.filter(newsItem => !newsItem.isVerified)
                );
            } else if (auth.id && !auth.isAdmin) {
                setFilteredOnSearch(news);
            } else {
                setFilteredOnSearch(
                    news.filter(newsItem => newsItem.isVerified)
                );
            }
        }
        // eslint-disable-next-line
    }, [news]);

    const newsHTML = filteredOnSearch.map((newsItem, ndx) => (
        <li key={ndx} className={blockClassName + '__item'}>
            <h3 className={blockClassName + '__item-title'}>
                {newsItem.title}
            </h3>
            <p className={blockClassName + '__body'}> {newsItem.body}</p>

            <div className={blockClassName + '__foot'}>
                <time className={blockClassName + '__time'}>
                    {new Date(newsItem.date).toLocaleDateString()}
                </time>
                {auth.id && !auth.isAdmin && (
                    <div className={blockClassName + '__status'}>
                        {!newsItem.isVerified && 'Новость еще не одобрена'}
                    </div>
                )}
            </div>

            {auth.id && auth.isAdmin && (
                <div className={blockClassName + '__actions'}>
                    <button
                        className="btn btn_warning"
                        onClick={() => handleRemove(newsItem.id)}>
                        Удалить
                    </button>
                    <button
                        className="btn btn_alert"
                        onClick={() => handleApprove(newsItem.id)}>
                        Одобрить
                    </button>
                </div>
            )}
        </li>
    ));

    return (
        <div className={className}>
            {auth.id && !auth.isAdmin && (
                <form
                    className={blockClassName + '__form'}
                    onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={blockClassName + '__title'}>
                        Добавить новость
                    </h2>
                    <div className={blockClassName + '__form-list'}>
                        <div className={blockClassName + '__field input'}>
                            <input
                                type="text"
                                name="newsitemtitle"
                                className="input__field"
                                placeholder="Введите заголовок новости"
                                autoComplete="off"
                                ref={register}
                            />
                            <span className="input__error">
                                {errors.newsitemtitle &&
                                    errors.newsitemtitle.message}
                            </span>
                        </div>
                        <div className={blockClassName + '__field input'}>
                            <input
                                type="text"
                                name="newsitembody"
                                className="input__field"
                                placeholder="Введите новость"
                                autoComplete="off"
                                ref={register}
                            />
                            <span className="input__error">
                                {errors.newsitembody &&
                                    errors.newsitembody.message}
                            </span>
                        </div>
                        <div className={blockClassName + '__field'}>
                            <button className="btn btn_wide">Отправить</button>
                        </div>
                    </div>
                </form>
            )}

            <Search onSearch={onSearch} className="news" />

            <div className={className + '__content'}>
                <h2 className={className + '__title'}>News</h2>
                {isFetchingData ? (
                    <Loader />
                ) : (
                    <ul className={blockClassName + '__list'}>
                        {newsHTML.length ? (
                            newsHTML
                        ) : (
                            <li
                                className={
                                    blockClassName + '__item news__item_empty'
                                }>
                                {touchedSearch ? (
                                    <p>Ничего не найдено</p>
                                ) : (
                                    <p>Записей пока нет</p>
                                )}
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default withModificator(NewsList, blockClassName);
