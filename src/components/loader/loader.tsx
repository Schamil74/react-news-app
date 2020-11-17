import React, { FC } from 'react';
import withModificator from '../../withClass';
const blockClassName = 'loader';
type TPropsLoader = {
    className: string;
};
const Loader: FC<TPropsLoader> = props => {
    const { className } = props;
    return (
        <div className={className}>
            <div className={blockClassName + '__spin'}></div>
        </div>
    );
};

export default withModificator(Loader, blockClassName);
