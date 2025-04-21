import React, {useEffect, useState} from 'react';
import {FiSearch} from "react-icons/fi";
import {Button, Input} from "antd";
import {useAppDispatch} from "../hooks";

interface Props {
    getData?: any;
    defaultValue?: string | number;
    columns: string[],
    placeholderColumn?: string,
}

const SearchInput: React.FC<Props> = ({ getData, defaultValue, columns, placeholderColumn = "" }) => {
    const [query, setQuery] = useState<string| null>('');
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let fullFilterQuery = "";
        columns.map(column => fullFilterQuery += `${column}[lk]=%${query}%`);
        setFilter(fullFilterQuery);
    }, [filter, columns, query]);

    const handleClear = () => {
        setLoading(true);
        setQuery(null);
        dispatch(getData());
        setLoading(false);
    }

    const handleSearch = () => {
        setLoading(true);
        (!query) ? dispatch(getData) : dispatch(getData(filter));
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
    }


    const onKeyDownSearchhandler = (event: any) => {
        const enterKeyCode = 13;
        if(event.which != enterKeyCode) return;

        setLoading(true);
        (!query) ? dispatch(getData) : dispatch(getData(filter));
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
    }




    return (
        <Input defaultValue={defaultValue}
            allowClear
            onClear={handleClear}
            onChange={(e) => { e.target.value ? setQuery(e.target.value) : handleClear()} }
            prefix={<FiSearch size={20}/>}
            className={'dashboard-search'}
            placeholder={`Search by name ${placeholderColumn}...`}
            type="search"
            onKeyUp={onKeyDownSearchhandler}
            suffix={
            <Button
                // size={'small'}
                className={'btn-red w-16 md:w-fit h-7 md:h-9 rounded-xl'}
                disabled={query === null || query === ''}
                loading={loading}
                onClick={handleSearch}>
                Search
            </Button>
        }
        />
    );
};

export default SearchInput;
