import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiEye, FiPlusCircle} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import { MenuLinks } from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../../utils/query.ts";
import TableActions from "../../../common/table-actions.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import { currencyFormat } from "../../../utils";
import {
    deleteGoodsReceiptItem,
    getAllGoodsReceiptItems
} from "../../../state/goods-receipt/items/goodsReceiptItemAction.ts";


const GoodsReceiptItems: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.goodsReceiptItem.goodsReceiptItem);
    const goodsReceiptItem = useAppSelector(state => state.goodsReceipt.goodsReceiptItem);
    return (
        <>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <h2 className={'capitalize'}>
                    <span className={' text-2xl font-medium'}>Goods Receipts Information</span>
                    &nbsp; supplied by &nbsp;
                    <span style={{fontSize: "17px"}}>({
                        // @ts-ignore
                        goodsReceiptItem?.supplier?.name ?? "-"
                    })</span>
                </h2>
                <div className={'flex flex-wrap justify-between items-center'}>
                    <TlaOpen title={"Edit Stock"} data={goodsReceiptItem} modal={true}
                             to={MenuLinks.admin.goodsReceipt.form}>
                            <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                                View goods Receipt Info <FiEye/>
                            </span>
                    </TlaOpen>
                </div>
            </div>


            <div className={'bg-white rounded-2xl p-5'}>
                <TlaOpen to={MenuLinks.admin.goodsReceipt.itemForm}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                </TlaOpen>

                <TlaTableWrapper getData={getAllGoodsReceiptItems} data={data} filter={commonQuery(`&goodsReceiptId[eq]=${goodsReceiptItem?.id}`)} meta={meta}>
                    <Column title={'Product'} dataIndex={["product", "name"]}/>
                    <Column title={'Quantity Received'} dataIndex={'quantityReceived'}/>
                    <Column title={'Unit Price On Receipt'} render={(record: any) => <span>
                        {currencyFormat(+record?.unitPriceAtReceipt)}
                    </span>}/>

                    <Column title={'Total Amount'} render={(record: any) => <span className={'font-semibold'}>
                        {
                            currencyFormat((+record?.unitPriceAtReceipt * +record?.quantityReceived))
                        }
                    </span>}/>

                    <Column title={'Action'} render={((record) => (
                            <TableActions items={[
                                {
                                    key: '1',
                                    label: (
                                        <TlaOpen data={record} modal={true}
                                                 to={MenuLinks.admin.stockAdjustment.singleItemForm}>
                                            <FiEdit3/>
                                            Edit
                                        </TlaOpen>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <TlaDelete title={'stock adjustment'} column={record.id}
                                                   callBack={deleteGoodsReceiptItem}/>
                                    ),
                                }
                            ]}/>
                        )
                    )}/>
                </TlaTableWrapper>
            </div>
        </>

    )
}

export default GoodsReceiptItems;
