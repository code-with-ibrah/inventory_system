import React, {useState} from 'react';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks";
import SearchInput from "./search-input.tsx";
import {removeNullValues} from "../utils";

interface FilterProps {
    filter?: any;
    getData?: ActionCreatorWithPayload<any>;
}

const BaseFilter: React.FC<FilterProps> = ({ filter, getData }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleFilter = (searchTerm: string) => {
        setLoading(true);

        const f = removeNullValues({ ...filter, search: searchTerm });

        getData && dispatch(getData(f));

        setLoading(false)
    };

    return (
        <div className={''}>
            <SearchInput loading={loading} getData={handleFilter} />
        </div>
    );
};

export default BaseFilter
