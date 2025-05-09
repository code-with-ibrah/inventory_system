import {Table} from 'antd';
import {AiOutlineLoading} from "react-icons/ai";
import ReactPaginate from 'react-paginate';
import {Meta} from "../types/common.ts";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AsyncThunk, unwrapResult} from "@reduxjs/toolkit";
import {useEffect, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

interface Props {
    data: any [],
    meta: Meta | null,
    children: any,
    filter: any,
    loading?: boolean,
    getData?: AsyncThunk<any, any, any> | any;
    parameter?: any,
    isLocal?: boolean,
}

const TlaTableWrapper = ({data, children, loading, meta, filter, getData, parameter, isLocal = false}: Props) => {
    const [dataFilter, _] = useState<any>();
    const { status } = useAppSelector(state => state.errors)
    const dispatch = useAppDispatch()
    const [fetch, setFetch] = useState<boolean>(false);

    const handlePageClick = (event: any) => {
        handleDataFetch( event.selected + 1);
    };

    // const handlePageSizeChange = (value: any) => {
    //     setDataFilter((prev: any) => ({...prev, pageSize: value}));
    // }

    useEffect(() => {

        if(isLocal){
            dispatch(getData(''))
        }
        else{
            handleDataFetch();
        }


    }, [dataFilter]);

    const handleDataFetch = (pageNumber?: number) => {
        setFetch(true)

        if(!pageNumber) filter += `&page=1`;
        else filter += `&page=${pageNumber}`;

        if(isLocal){
            setFetch(false);
        }
        else
        {
            if(parameter){
                getData && dispatch(getData(parameter))
                    .then(unwrapResult)
                    .then(() => setFetch(false))
                    .catch(() => setFetch(false));
            }
            else
            {
                (getData) &&
                dispatch(getData(filter))
                    .then(unwrapResult)
                    .then(() => setFetch(false))
                    .catch(() => setFetch(false))
            }
        }
    }

    return (
        <>
            <Table
                pagination={false}
                rootClassName={'w-full'}
                scroll={{x: 'max-content'}}
                loading={{
                    spinning: loading || fetch || status === 'loading',
                    tip: 'Please wait...',
                    indicator: <AiOutlineLoading className={'spin'}/>
                }}
                dataSource={data}
                rowKey={'id'}
                className={'auto-apply-table'}
                rowClassName={'tla-table-row'}>
                <Table.Column
                    fixed
                    title={'#'}
                    render={(_value, _record, index) => {
                        let number = (meta?.from) ? index + meta?.from : 1;
                        return <>{`${number++}.`}</>;
                    }}
                />
                {children}
            </Table>
            <div className={'flex flex-wrap justify-between items-center pt-3'}>
                <div>
                    {/*<Select prefix={"Showing"} disabled={meta?.total <= 10} onChange={handlePageSizeChange}*/}
                    {/*        size={'large'} defaultValue={pageSize}>*/}
                    {/*    <Select.Option value={"10"}>10</Select.Option>*/}
                    {/*    <Select.Option value={"20"}>20</Select.Option>*/}
                    {/*    <Select.Option value={"50"}>50</Select.Option>*/}
                    {/*    <Select.Option value={"100"}>100</Select.Option>*/}
                    {/*    <Select.Option value={"150"}>150</Select.Option>*/}
                    {/*    <Select.Option value={"200"}>200</Select.Option>*/}
                    {/*</Select>*/}
                </div>
                {meta ? <ReactPaginate
                    className={"pagination"}
                    breakLabel="..."
                    nextLabel={<FiChevronRight/>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={meta?.last_page}
                    previousLabel={<FiChevronLeft/>}
                    renderOnZeroPageCount={null}
                /> : null}
            </div>
        </>
    )
};

export default TlaTableWrapper;
