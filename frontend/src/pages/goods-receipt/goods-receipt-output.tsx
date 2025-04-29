

const GoodsReceiptOutput = () => {
    return <>
        <body className="bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg my-8 p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Goods Receipt</h1>
                    <p className="text-sm text-gray-500">Receipt No: GR-[Receipt ID]</p>
                </div>
                <div>
                    <img src="your-company-logo.png" alt="Company Logo" className="h-12"/>
                </div>
            </div>

            <div className="mb-4 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Supplier</h2>
                <p className="text-gray-600">
                    <span className="font-medium">Name:</span> [Supplier Name]
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Address:</span> [Supplier Address]
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Contact:</span> [Supplier Contact]
                </p>
            </div>

            <div className="mb-4 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Receipt Details</h2>
                <p className="text-gray-600">
                    <span className="font-medium">Date:</span> [Date]
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Received By:</span> [Receiver Name]
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-md shadow">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit
                            Price
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-4 py-3 text-sm text-gray-500">1</td>
                        <td className="px-4 py-3 text-sm text-gray-900">[Product Name 1]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Qty 1]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Unit Price 1]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Total 1]</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 text-sm text-gray-500">2</td>
                        <td className="px-4 py-3 text-sm text-gray-900">[Product Name 2]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Qty 2]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Unit Price 2]</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700">[Total 2]</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="4" className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Subtotal:
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-gray-700">[Subtotal Amount]</td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="px-4 py-3 text-right text-sm font-semibold text-gray-800">Grand
                            Total:
                        </td>
                        <td className="px-4 py-3 text-right text-xl font-bold text-indigo-600">[Grand Total Amount]</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div className="mt-8 text-sm text-gray-500 text-center">
                <p>Thank you for your business!</p>
                <p>Received on: [Timestamp]</p>
            </div>
        </div>
        </body>
    </>
}



export default GoodsReceiptOutput;