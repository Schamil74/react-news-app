import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { Dispatch } from 'redux';
import {
    setIsErrorAuth,
    setIsErrorData,
} from '../../store/actions/fetchErrorActions';
import { IIsErrorType } from '../../store/types/fetchErrorTypes';

const blockClassName = 'error';
type TError = {
    error: {
        isErrorAuth: IIsErrorType;
        isErrorData: IIsErrorType;
    };
};
const Error: FC<TError> = props => {
    const { isErrorAuth, isErrorData } = props.error;
    const dispatch: Dispatch = useDispatch();
    return (
        <Popup
            open={isErrorAuth.error || isErrorData.error}
            modal
            onClose={() =>
                isErrorAuth.error
                    ? dispatch(setIsErrorAuth({ error: false, msg: '' }))
                    : dispatch(setIsErrorData({ error: false, msg: '' }))
            }>
            {(close: Function) => (
                <div className={blockClassName}>
                    <h2 className={blockClassName + '__title'}>
                        {isErrorAuth.error
                            ? 'Ошибка авторизации'
                            : 'Ошибка получения данных'}
                    </h2>
                    <p className={blockClassName + '__text'}>
                        {isErrorAuth.msg}
                    </p>
                </div>
            )}
        </Popup>
    );
};

export default Error;
