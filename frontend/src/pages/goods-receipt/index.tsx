import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiCheck, FiEdit3, FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {commonQuery} from "../../utils/query.ts";
import {currencyFormat, formatDate} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import TableActions from "../../common/table-actions.tsx";
import {useNavigate} from "react-router-dom";
import {GoodsReceipt} from "../../types/goods-receipt.ts";
import {
    deleteGoodsReceipt,
    getAllGoodsReceipts,
    toggleGoodsReceipt
} from "../../state/goods-receipt/goodsReceiptAction.ts";
import {setSupplier} from "../../state/supplier/supplierSlice.ts";
import {setGoodsReceipt} from "../../state/goods-receipt/goodsReceiptSlice.ts";
import TlaToggleActive from "../../common/tla-toggle-active.tsx";
import {FilePdfOutlined} from "@ant-design/icons";
import {TlaInfoTag, TlaSuccessTag} from "../../common/tla-tag.tsx";



const GoodsReceipts: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.goodsReceipt.goodsReceipt);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setGoodsReceipt(record));
        navigate(MenuLinks.admin.goodsReceipt.itemIndex);
    };

    const goToSupplierDetail = (record: any) => {
        dispatch(setSupplier(record));
        navigate(MenuLinks.admin.supplier.details.index);
    };

    const goToInvoiceDetails = (record: any) => {
        dispatch(setGoodsReceipt(record));
        dispatch(setSupplier(record?.supplier));
        navigate(MenuLinks.admin.goodsReceipt.invoice);
    }

    return (
        <>
            <div className={'bg-white rounded-2xl p-5'}>
                <TlaOpen to={MenuLinks.admin.goodsReceipt.form}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                </TlaOpen>

                <TlaTableWrapper getData={getAllGoodsReceipts} data={data} filter={commonQuery()} meta={meta}>
                    <Column
                        title="Receipt Number"
                        render={(record: GoodsReceipt) => (
                            <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record?.receiptNumber ?? "view details"}
                        </span>
                        )}/>
                    <Column title="Date" render={(record: GoodsReceipt) => <span>{formatDate(record?.date)}</span>}/>
                    <Column
                        title="Supplier"
                        render={(record: any) => (
                            <span className={'cursor-pointer underline'} onClick={() => goToSupplierDetail(record?.supplier)}>
                            { record?.supplier?.name ?? "-" }
                        </span>
                        )}/>
                    <Column title="Creator" dataIndex={["user", "name"]}/>
                    <Column title="Total Amount" render={(record: any) => (<span className={'font-semibold'}>{ currencyFormat(+record?.totalAmount) }</span>)}/>
                    <Column title="Condition of Goods" render={(record: GoodsReceipt) => <span>
                        { record?.conditionOfGoods ?? "-" }
                    </span>}/>

                    <Column title="Status" render={(record) => <span>{record.isRecorded ? <TlaSuccessTag text={'Recorded'}/> : <TlaInfoTag text={'Not recorded'}/> }</span>}/>

                    <Column title={'Action'} render={(record) => (
                            <TableActions items={[
                                {
                                    key: '1',
                                    label: (
                                        <TlaOpen data={record} modal={true} to={MenuLinks.admin.goodsReceipt.form}>
                                            <FiEdit3/>
                                            Edit
                                        </TlaOpen>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: (
                                        record.isRecorded ? <button onClick={() => goToInvoiceDetails(record)}>
                                            <FilePdfOutlined/>
                                            Generate Invoice
                                        </button> : <span className={'hidden'}/>
                                    )
                                },
                                {
                                    key: '4',
                                    label: (
                                        !record.isRecorded ? <div className={'flex align-items-center gap-2'}>
                                            <FiCheck className={'mt-1'}/>
                                            <TlaToggleActive text={'Mark as recorded'}
                                                             message={'Do you want to mark this receipt as recorded ? this action cannot be reversed.'}
                                                             title={'goods receipt'}
                                                             column={{id: record.id, column: "isRecorded"}}
                                                             callBack={toggleGoodsReceipt}/>
                                        </div> : null
                                    )
                                },
                                {
                                    key: '5',
                                    label: (
                                        <>
                                            { !record?.isRecorded ? <TlaDelete title={'goods receipt'} column={record.id}
                                                        callBack={deleteGoodsReceipt}/> : null }
                                        </>
                                    ),
                                },
                            ]}/>
                    )}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default GoodsReceipts;
