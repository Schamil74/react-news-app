import React, { FC } from 'react';
const blockClassName = 'search';

type TPropsSearch = {
    className: string;
    onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: FC<TPropsSearch> = props => {
    const { className, onSearch } = props;

    return (
        <div className={className + '__search'}>
            <h2 className={className + '__title'}>Поиск</h2>
            <div className={className + '__field input'}>
                <input
                    type="text"
                    name="search"
                    className="input__field"
                    placeholder="Поиск"
                    autoComplete="off"
                    onChange={onSearch}
                />
            </div>
        </div>
    );
};

export default Search;
