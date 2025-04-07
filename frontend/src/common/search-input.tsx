import React, {useCallback, useEffect, useState} from 'react';
import {FiSearch} from "react-icons/fi";
import {Button, Input} from "antd";
import {useDebounce} from "../hooks/debounce-hook.tsx";

interface Props {
    getData?: any;
    loading?: boolean;
    defaultValue?: string | number;
}

const SearchInput: React.FC<Props> = ({ getData, loading, defaultValue }) => {
    const [query, setQuery] = useState<string| null>('');
    const debouncedQuery = useDebounce(query, 500);

    const handleSearch = useCallback((searchTerm: string | null) => {
        if(getData){
            getData(searchTerm)
        }
    }, []);

    useEffect(() => {
        if (debouncedQuery) {
            handleSearch(debouncedQuery);
        }
    }, [debouncedQuery, handleSearch]);

    const handleClear = () => {
        handleSearch(null)
    }

    return (
        <Input defaultValue={defaultValue}
            allowClear
            onClear={handleClear}
            onChange={(e) => { e.target.value ? setQuery(e.target.value) : handleClear()} }
            prefix={<FiSearch size={20}/>}
            className={'dashboard-search'}
            placeholder={'Search by name...'}
            type="search"
            suffix={
            <Button
                // size={'small'}
                className={'btn-red w-16 md:w-fit h-7 md:h-9 rounded-xl'}
                disabled={query === null || query === ''}
                loading={loading} onClick={(() => handleSearch(debouncedQuery))}>
                Search
            </Button>
        }
        />
    );
};

export default SearchInput;
