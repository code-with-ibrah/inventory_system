import SingleItem from "./single-item.tsx";


type PropsType = {
    data: any
}

const DashboardCounts = ({ data }: PropsType) => {

    console.log(data);

    return (
        <div>
            <p className="text-gray-600 uppercase font-semibold mb-2 mt-8">dashboard counters</p>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5"}>
                <div className={"grid grid-cols-5 gap-5 p-5 border-none md:border-y"}>
                    <div className={'border-r'}>
                        <SingleItem title={"Total Products"} value={data?.productCount ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Low Stock Product"} value={data?.lowStocksCount ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Pending Orders  "} value={data?.pendingOrdersCount ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Unrecorded Receipts"} value={data?.unrecordedReceipt ?? 0}/>
                    </div>
                    <SingleItem title={"Suppliers"} value={data?.supplierCount ?? 0}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardCounts