import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {renderStatus} from "../../../utils";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import TlaEdit from "../../../common/tla-edit.tsx";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {deleteStockUnit, getAllStockUnits} from "../../../state/stock-unit/stockUnitAction.ts";
import {commonQuery} from "../../../utils/query.ts";



const StockUnits: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.stockUnit.stockUnit);

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.productSettings.stockUnitForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllStockUnits} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column title="Active Status" dataIndex={(record: any) => renderStatus(record.isActive)}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.productSettings.stockUnitForm}/>
                                <TlaDelete title={'stock unit'} column={record.id} callBack={deleteStockUnit}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default StockUnits;
