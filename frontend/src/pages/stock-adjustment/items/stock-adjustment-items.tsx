import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import { MenuLinks } from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../../utils/query.ts";
import TableActions from "../../../common/table-actions.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {
    deleteStockAdjustmentItem,
    getAllStockAdjustmentItems
} from "../../../state/stock-adjustment-item/stockAdjustmentItemAction.ts";
import { currencyFormat } from "../../../utils";


const StockAdjustments: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.stockAdjustmentItem.stockAdjustmentItem);
    const stockAdjustment = useAppSelector(state => state.stockAdjustment.stockAdjustmentItem);
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.stockAdjustment.itemsForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllStockAdjustmentItems} data={data} filter={commonQuery(`&adjustmentId[eq]=${stockAdjustment?.id}`)} meta={meta}>
                <Column title={'Product'} dataIndex={'product'}/>
                <Column title={'Previous Quantity'} dataIndex={'previousQuantity'}/>
                <Column title={'Adjusted Quantity'} dataIndex={'adjustedQuantity'}/>
                <Column title={'New Quantity'} dataIndex={'newQuantity'}/>
                <Column title={'Status'} dataIndex={'status'}/>
                <Column title={'Unit Cost At Adjustment'} render={(record: any) => <span>
                    {currencyFormat(+record?.unitCostAtAdjustment)}
                </span>} />
                <Column title={'Adjustment Cost'} render={(record: any) => <span>
                    {currencyFormat(+record?.associatedCost)}
                </span>} />
                <Column title={'Action'} render={((record) => (
                    <TableActions items={[
                        {
                            key: '1',
                            label: (
                                <TlaOpen data={record} modal={true} to={MenuLinks.admin.stockAdjustment.singleItemForm}>
                                    <FiEdit3/>
                                    Edit
                                </TlaOpen>
                            ),
                        },
                        {
                            key: '2',
                            label: (
                                <TlaDelete title={'stock adjustment'} column={record.id} callBack={deleteStockAdjustmentItem}/>
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
