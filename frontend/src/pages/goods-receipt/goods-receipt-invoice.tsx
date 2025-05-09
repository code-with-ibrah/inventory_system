import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import { getAllGoodsReceiptItems } from "../../state/goods-receipt/items/goodsReceiptItemAction";
import {commonQuery} from "../../utils/query.ts";
// import {currencyFormat, formatDate} from "../../utils";


const GoodsReceiptInvoice = () => {
    // const supplier = useAppSelector(state => state.supplier.supplierItem);
    const {data} = useAppSelector(state => state.goodsReceiptItem.goodsReceiptItem);
    const goodsReceipt = useAppSelector(state => state.goodsReceipt.goodsReceiptItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllGoodsReceiptItems(
            commonQuery(`&goodsReceiptId[eq]=${goodsReceipt?.id}`))
        );
    }, []);

    // let counter = 1;
    // let subTotal = 0;

    console.log(goodsReceipt)
    console.log(data);

    return <>
        <div className="bg-gray-100">
            <div className="mx-auto bg-white rounded-md p-8">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-semibold">Jessden Ventures</h1>
                    <p className="text-sm text-gray-600">Location: Dome Pillar 2</p>
                    <p className="text-sm text-gray-600">Digital Address: GE-325-9976</p>
                    <p className="text-sm text-gray-600">Phone: +233 50 006 1419</p>
                </div>

                <div className="flex justify-between mb-4 text-sm">
                    <div>
                        <span className="font-semibold">Invoice No.:</span> 1002
                    </div>
                    <div>
                        <span className="font-semibold">Date:</span> 15/03/25
                    </div>
                </div>

                <div className="mb-4 text-sm">
                    <div><span className="font-semibold">Invoice For:</span> Ammarah - Nag Fairmount Accra</div>
                    <div><span className="font-semibold">Payable To:</span> Jessden Ventres</div>
                    <div><span className="font-semibold">Project:</span> Fuel Anti-Syphon Guard System Installation
                    </div>
                </div>

                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full table-auto text-left text-sm">
                        <thead className="bg-gray-300">
                        <tr>
                            <th className="px-4 py-2">Deliverables</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Unit Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-4 py-2">Water</td>
                            <td className="border px-4 py-2">Bottled Water</td>
                            <td className="border px-4 py-2">12</td>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">12</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="text-sm">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Subtotal</span>
                        <span>12.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">NHIL/GetFund/Covid (6%)</span>
                        <span>0.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Sub Total</span>
                        <span>0.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">II VAT (15%)</span>
                        <span>0.00</span>
                    </div>
                    <div className="flex justify-between mb-4 text-lg font-semibold">
                        <span>Total Due By Date 15/03/2025</span>
                        <span>0.00</span>
                    </div>
                </div>

                <div className="mb-4 text-xs text-gray-700">
                    <h2 className="font-semibold mb-1">Terms:</h2>
                    <p>100% 30 days deferred Payment after complete installation Production Leadtime is 3 days</p>
                </div>

                <div className="text-center text-sm text-gray-600">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </div>
    </>
}


export default GoodsReceiptInvoice;