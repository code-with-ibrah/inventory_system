import React from "react";
import Column from "antd/es/table/Column";
import { useAppSelector } from "../../../../hooks";
import { MenuLinks } from "../../../../utils/menu-links";
import {Button} from "antd";
import TlaTableWrapper from "../../../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../../../common/pop-ups/TlaOpen.tsx";
import {FiPlusCircle} from "react-icons/fi";
import TlaEdit from "../../../../common/tla-edit.tsx";
import TlaDelete from "../../../../common/tla-delete.tsx";
import {deleteRole, getAllRoles} from "../../../../state/role/rolesAction.ts";
import {renderStatus} from "../../../../utils";


const Roles: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.role.role);

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.config.details.roleForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New Role</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllRoles} data={data} filter={""} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column title="Active Status" dataIndex={(record: any) => renderStatus(record.isActive)}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.config.details.roleForm}/>
                                <TlaDelete title={'role'} column={record.id} callBack={deleteRole}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Roles
