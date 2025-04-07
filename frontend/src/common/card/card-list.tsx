import {useEffect, useState} from "react";
import CommonCard from "./common-card";
import {Empty, Pagination, Spin} from "antd";
import "./card.css";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setLoaderState} from "../../state/common/commonSlice.ts";
import {unwrapResult} from "@reduxjs/toolkit";

type propsType = {
    getData?: any,
    onClick?: any,
    limit?: any,
    filter?: any,
    data?: any,
    meta?: any,
    emptyText?: any,
    loadFromState?: any,
}

const CardList = (props:propsType) => {
    const [localFilter, setLocalFilter] = useState(props.filter);
    const { active } = useAppSelector(state => state.loader.loader);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);


    const pageChangeHandler = (pageNumber: number) => {
        setLocalFilter(`${localFilter}&page=${pageNumber}`);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleDataFetch = () => {
        setLoading(true);
        dispatch(setLoaderState(true));

        props.getData &&
        dispatch(props.getData(localFilter))
            .then(unwrapResult)
            .then(() => { setLoading(false); dispatch(setLoaderState(false)); } )
            .catch(() => { setLoading(false); dispatch(setLoaderState(false)); });
    };

    useEffect(() => {
        handleDataFetch();
    }, [localFilter]);

    let counter = 0;

    return <div className="home-container">
        <Spin tip="Loading" size="large" spinning={!props.loadFromState ? active : loading}>

            <div className="award-section__wrapper">

            {props.data.length == 0 && <Empty
                description={props.emptyText ? props.emptyText : "We're always adding more – keep an eye out!"}
            />}

            {props.limit ? props.data.map((item: any, index: any) => {
                if(props.limit && props.limit > 0){
                    counter++;
                    if(counter >= Number(props.limit + 1)) return;
                }
                return <CommonCard
                    key={index}
                    onClick={() => props.onClick(item)}
                    title={item.name}
                    duration={item.endDate}
                    imgUrl={item.image}
                />})
                :
            props.data.map((item: any, index: any) => {
                if(props.limit && props.limit > 0){
                    counter++;
                    if(counter >= Number(props.limit)) return;
                }
                return <CommonCard
                    key={index}
                    onClick={() => props.onClick(item)}
                    title={item.name}
                    duration={item.endDate}
                    imgUrl={item.image}
                />})}

        </div>

        </Spin>

        {(props.data.length) ? <div className="pagination-wrapper">
            <Pagination
                onChange={pageChangeHandler}
                align="end"
                defaultPageSize={props.meta?.per_page}
                defaultCurrent={1}
                total={props.meta?.total} />
        </div> : <></>}
    </div>
};


export default CardList;