import React from "react";
import SingleItem from "./single-item.tsx";


const OtherUtilityCounts: React.FC = () => {

    return (
        <div>
            <p className="text-gray-600 uppercase font-semibold mb-2 mt-8">other statistics</p>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5"}>
                <div className={"grid grid-cols-4 gap-5 p-5 border-none md:border-y"}>
                    <div className={'border-r'}>
                        <SingleItem title={"Low stock Product"} value={0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Cancelled orders"} value={0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Pending Orders"} value={0}/>
                    </div>
                    <SingleItem title={"Unrecorded Receipts"} value={0}/>
                </div>
            </div>
        </div>
    )
}

export default OtherUtilityCounts;