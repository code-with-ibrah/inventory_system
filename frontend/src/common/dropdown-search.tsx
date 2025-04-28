import React, {useEffect, useState} from "react";
import {SelectProps, Tooltip} from "antd";
import {Select} from "antd";
import {useAppDispatch} from "../hooks";
import {type AsyncThunk, unwrapResult} from "@reduxjs/toolkit";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

interface ISearch {
    placeholder: string;
    extraParams?: string;
    suffix?: React.ReactNode | null;
    mode?: "multiple" | undefined;
    setResult: (value: any) => void;
    searchApi: AsyncThunk<any, any, any>;
    object?: boolean;
    initialValue?: string[] | string | null;
    label?: string[] | string;
    defaultValue?: any | null;
    onChange?: (value: any) => void | undefined,
    onClick?: () => void | undefined;
    disabled?: boolean;
    singleFetch?: boolean;
    setFetchedDataLength?: any,
    allowClear?: boolean;

}

const DropdownSearch = ({
                            onChange,
                            onClick,
                            singleFetch = true,
                            allowClear = false,
                            setFetchedDataLength,
                            placeholder,
                            searchApi,
                            mode = undefined,
                            disabled = false,
                            setResult,
                            suffix,
                            object = false,
                            initialValue,
                            extraParams,
                            defaultValue = null,
                            label = 'name'
                        }: ISearch) => {
    const [data, setData] = useState<SelectProps["options"]>([]);
    const [wholeData, setWholeData] = useState<any>([]);
    const [value, setValue] = useState<any>(initialValue);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [dataIsFetched, setDataIsFetched] = useState(false);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const extractLabel = (item: any) => {
        if (Array.isArray(label)) {
            return label.map((key) => item[key]).join(" ");
        }
        return item[label]
    }

    const fetch = (value: string, callback: (data: any) => void) => {
        setLoading(true);
        setDataIsFetched(false);
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const fake = () => {

            dispatch(searchApi(extraParams))
                .then(unwrapResult)
                .then((res: any) => {
                    setWholeData(res.data);

                    if (currentValue === value) {
                        const data = res.data.map((item: any) => ({
                            value: item.id,
                            text: extractLabel(item),
                        }));
                        callback(data);
                        setFetchedDataLength(data.length);
                    }
                    setLoading(false);
                    setDataIsFetched(true);
                }).catch(() => { setDataIsFetched(true); setLoading(false)});
        };
        if (value) {
            timeout = setTimeout(fake, 50);
        } else {
            callback([]);
        }
    };


    const handleChange = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }

        setResult(
            object
                ? wholeData?.find(
                    (d: { id: string }) =>
                        d.id === (mode === "multiple" ? newValue[0] : newValue),
                )
                : newValue,
        );
        setValue(newValue);
    };

    const onClickHandler = () => {
        (onClick) && onClick();

        if(!dataIsFetched ){
            fetch("keyword", setData);
        }

        if(!singleFetch){
            fetch("keyword", setData);
        }
    }


    return (
        <>
            <Tooltip
                className={'bg-app-red'}
                title="Fetching..."
                open={loading}
                placement="top"/>

            <Select
                loading={loading}
                disabled={disabled}
                defaultValue={defaultValue}
                mode={mode}
                showSearch={false}
                allowClear={allowClear}
                value={value}
                placeholder={placeholder}
                className={"w-full toggle-select"}
                defaultActiveFirstOption={false}
                suffixIcon={suffix}
                filterOption={false}
                onChange={handleChange}
                onClick={onClickHandler}
                notFoundContent={null}
                options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                }))}
            />
    </>
    );
};

export default DropdownSearch;
