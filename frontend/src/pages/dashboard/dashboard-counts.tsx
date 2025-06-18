import SingleItem from "./single-item.tsx";


type PropsType = {
    data: any
}

const DashboardCounts = ({ data }: PropsType) => {

    return (
        <div>
            <p className="text-gray-600 uppercase font-semibold mb-2 mt-8">dashboard counters</p>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5 shadow-md"}>
                <div
                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2 md:p-5 border-none md:border-y border-gray-200"}>
                    <div className={'border-b pb-4 sm:border-r sm:border-b-0 sm:pb-0 lg:border-r border-gray-200'}>
                        <SingleItem title={"Total Products"} value={data?.productCount ?? 0}/>
                    </div>
                    <div className={'border-b pb-4 sm:border-r sm:border-b-0 sm:pb-0 lg:border-r border-gray-200'}>
                        <SingleItem title={"Stock Alert"} value={data?.lowStocksCount ?? 0}/>
                    </div>
                    <div className={'border-b pb-4 sm:border-r sm:border-b-0 sm:pb-0 lg:border-r border-gray-200'}>
                        <SingleItem title={"Pending Orders"} value={data?.pendingOrdersCount ?? 0}/>
                    </div>
                    <div className={'border-b pb-4 sm:border-r sm:border-b-0 sm:pb-0 lg:border-r border-gray-200'}>
                        <SingleItem title={"Unrecorded Receipts"} value={data?.unrecordedReceipt ?? 0}/>
                    </div>
                    <div>
                        <SingleItem title={"Suppliers"} value={data?.supplierCount ?? 0}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCounts