import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { Dispatch } from 'redux';
import * as yup from 'yup';
import { setAuthOpen, thunkLogin } from '../../store/actions/authActions';
import { AppThunkDispatch, RootState } from '../../store/types';
import withModificator from '../../withClass';

const blockClassName = 'login';

let schema = yup.object().shape({
    id: yup.string().required('Поле ID не должно быть пустым'),
});

type TModalError = {
    className: string;
};

const Login: FC<TModalError> = props => {
    const authReducer = (state: RootState) => state.authReducer;
    const dispatch: Dispatch = useDispatch();
    const thunkDispatch: AppThunkDispatch = useDispatch();
    const { isOpen, auth } = useSelector(authReducer);
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

    const onSubmit = (data: { id: string }) => {
        thunkDispatch(thunkLogin(data.id));
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <Popup
            open={!auth.id && isOpen}
            modal
            onClose={() => dispatch(setAuthOpen(false))}>
            {(close: Function) => (
                <div className={blockClassName}>
                    <h2 className={blockClassName + '__title'}>Авторизация</h2>
                    <form
                        className={blockClassName + '__form'}
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className={blockClassName + '__list'}>
                            <div className={blockClassName + '__field input'}>
                                <input
                                    type="text"
                                    name="id"
                                    className="input__field"
                                    placeholder="Введите ID"
                                    ref={register}
                                    autoComplete="off"
                                />
                                <span className="input__error">
                                    {errors.id && errors.id.message}
                                </span>
                            </div>

                            <div
                                className={
                                    blockClassName + '__field login__btn'
                                }>
                                <button className="btn btn_wide">Войти</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
};

export default withModificator(Login, blockClassName);
