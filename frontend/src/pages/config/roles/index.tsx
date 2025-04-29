import React from "react";
import Column from "antd/es/table/Column";
import {MenuLinks} from "../../../utils/menu-links.ts";
import { useAppSelector } from "../../../hooks";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {Button} from "antd";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {deleteRole, getAllRoles} from "../../../state/role/rolesAction.ts";
import { FiPlusCircle } from "react-icons/fi";
import TlaEdit from "../../../common/tla-edit.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {commonQuery} from "../../../utils/query.ts";


const Roles: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.role.role);

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.config.roleForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllRoles} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.config.roleForm}/>
                                <TlaDelete title={'role'} column={record.id} callBack={deleteRole}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Roles
