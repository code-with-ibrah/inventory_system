import {Button} from "antd";
import {useEffect} from "react";
import {FiPrinter} from "react-icons/fi";
import {commonQuery} from "../../utils/query.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {currencyFormat, formatDate} from "../../utils";
import { getAllGoodsReceiptItems } from "../../state/goods-receipt/items/goodsReceiptItemAction";


const GoodsReceiptInvoice = () => {
    const {data: goodReceiptItemList} = useAppSelector(state => state.goodsReceiptItem.goodsReceiptItem);
    const goodsReceipt: any = useAppSelector(state => state.goodsReceipt.goodsReceiptItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllGoodsReceiptItems(
            commonQuery(`&goodsReceiptId[eq]=${goodsReceipt?.id}`))
        );
    }, []);

    return <>
        <div className="bg-gray-100 receipt-container">
            <div className="mx-auto bg-white rounded-md p-8">

                <Button
                    icon={<FiPrinter/>}
                    className={'btn btn-primary no-print'}
                    onClick={() => window.print()}>Print now
                </Button>

                <div className="fle">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold">Jessden Ventures</h1>
                        <p className="text-sm text-gray-600">Location: Dome Pillar 2</p>
                        <p className="text-sm text-gray-600">Digital Address: GE-325-9976</p>
                        <p className="text-sm text-gray-600">Phone: 0244411820</p>
                    </div>

                    <div className="flex justify-between mb-4 text-sm">
                        <div>
                            <span className="font-semibold">Receipt No: </span> {goodsReceipt?.receiptNumber}
                        </div>
                        <div>
                            <span className="font-semibold">Date:</span> {formatDate(goodsReceipt?.date)}
                        </div>
                    </div>

                    <div className="mb-8 text-sm">
                        <div className={'my-2'}><span className="font-semibold">Supplier:</span> {goodsReceipt?.supplier?.name}</div>
                        <div className={'my-2'}><span className="font-semibold">Total Products:</span> { goodReceiptItemList?.length }</div>
                        <div className={'my-2 capitalize'}>
                            <span className="font-semibold">Receipt Status:</span> {goodsReceipt?.isRecorded ? 'Recorded' : 'Not Recorded'}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full table-auto text-left text-sm font-mono">
                        <thead className="bg-gray-300">
                        <tr>
                            <th className="px-4 py-2">Products</th>
                            <th className="px-4 py-2">Unit Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                            {goodReceiptItemList.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td className="border px-4 py-2">{item?.product?.name}</td>
                                    <td className="border px-4 py-2">{item?.unitPriceAtReceipt}</td>
                                    <td className="border px-4 py-2 font-medium">{item.quantityReceived}</td>
                                    <td className="border px-4 py-2">{ currencyFormat(item?.unitPriceAtReceipt * item?.quantityReceived) }</td>
                                </tr>
                            })}
                        </tbody>


                        <br/>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">II VAT ({ goodsReceipt?.vatPercentage } %)</td>
                            <td className="border px-4 py-2 font-semibold">
                                { currencyFormat(goodsReceipt?.vatAmount) }
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">Subtotal</td>
                            <td className="border px-4 py-2 font-semibold">{ currencyFormat(+goodsReceipt?.totalAmount) }</td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">Grand Total</td>
                            <td className="border px-4 py-2 font-semibold">{currencyFormat(+goodsReceipt?.grandTotal)}</td>
                        </tr>

                        </tfoot>
                    </table>
                </div>

            </div>
        </div>

    </>
}


export default GoodsReceiptInvoice;