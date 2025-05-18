import SingleItem from "./single-item.tsx";
import {currencyFormat} from "../../utils";

type PropsType = {
    data: any
}

const RevenueCounts = ({ data }: PropsType) => {

    return (
        <div>
            <p className="text-gray-600 uppercase font-semibold mb-2 mt-8">revenue statistics</p>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5"}>
                <div className={"grid grid-cols-4 gap-5 p-5 border-none md:border-y"}>
                    <div className={'border-r'}>
                        <SingleItem title={"Total Revenue"} value={ currencyFormat(+data?.totalRevenue ?? 0)}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Total Orders"} value={data?.orderCount ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Expenses"} value={ currencyFormat(+data?.totalExpenses ?? 0) }/>
                    </div>
                    <SingleItem className={(data?.profit >= 0) ? '' : 'text-red-700' } title={"Profit"} value={ currencyFormat(data?.profit ?? 0)}/>
                </div>
            </div>
        </div>
    )
}

export default RevenueCounts;