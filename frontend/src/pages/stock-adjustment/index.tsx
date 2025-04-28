import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../utils/query.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {useNavigate} from "react-router-dom";
import TableActions from "../../common/table-actions.tsx";
import {setStockAdjustment} from "../../state/stock-adjustment/stockAdjustmentSlice.ts";
import {deleteStockAdjustment, getAllStockAdjustment} from "../../state/stock-adjustment/stockAdjustmentAction.ts";
import {formatDate} from "../../utils";
import TlaDelete from "../../common/tla-delete.tsx";
import {StockAdjustment} from "../../types/stock-adjustment.ts";


const StockAdjustments: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.stockAdjustment.stockAdjustment);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const goToDetails = (record: any) => {
        dispatch(setStockAdjustment(record));
        navigate(MenuLinks.admin.stockAdjustment.details);
    }
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.stockAdjustment.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllStockAdjustment} data={data} filter={commonQuery()} meta={meta}>
                <Column
                    title="Info"
                    render={(record: StockAdjustment) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            view adjusted products
                        </span>
                    )}/>
                <Column title="Date" render={(record: any) => formatDate(record?.date)}/>
                <Column title="By" dataIndex="user"/>
                <Column title="Reason Code" dataIndex="reasonCode"/>
                <Column title={'Action'} render={((record) => (
                    <TableActions items={[
                        {
                            key: '1',
                            label: (
                                <TlaOpen data={record} modal={true} to={MenuLinks.admin.stockAdjustment.form}>
                                    <FiEdit3/>
                                    Edit
                                </TlaOpen>
                            ),
                        },
                        {
                            key: '2',
                            label: (
                                <TlaDelete title={'stock adjustment'} column={record.id} callBack={deleteStockAdjustment}/>
                            ),
                        }
                    ]}/>
                )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default StockAdjustments;
