import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../utils/query.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {Product} from "../../types/product.ts";
import {useNavigate} from "react-router-dom";
import {setStock} from "../../state/stock/stockSlice.ts";
import {getAllStocks} from "../../state/stock/stockAction.ts";
import TlaEdit from "../../common/tla-edit.tsx";



const Stocks: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.stock.stock);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const goToDetails = (record: any) => {
        dispatch(setStock(record));
        navigate(MenuLinks.admin.stock.details);
    }
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.stock.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput columns={["productName"]} getData={getAllStocks}/>
            </div>

            <TlaTableWrapper getData={getAllStocks} data={data} filter={commonQuery()} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {
                                // @ts-ignore
                                record?.product?.name
                            }
                        </span>
                    )}/>
                <Column title="Warehouse" dataIndex={"warehouse"}/>
                <Column title="quantity On Hand" dataIndex="quantityOnHand"/>
                <Column title="stock Alert Level" dataIndex="stockAlertLevel"/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.stock.form}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Stocks;
