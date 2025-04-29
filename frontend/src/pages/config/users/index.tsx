import React from "react";
import Column from "antd/es/table/Column";
import {useAppSelector} from "../../../hooks";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {deleteUser, getAllUsers} from "../../../state/users/usersActions.ts";
import {FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {formatDate} from "../../../utils";
import TlaEdit from "../../../common/tla-edit.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {Button} from "antd";
import {commonQuery} from "../../../utils/query.ts";


const Users: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.users.users);
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.config.userForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllUsers} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column title="Email" dataIndex="email"/>
                <Column title="Phone" dataIndex="phone"/>
                <Column title="Last time login" render={(record: any) => <>
                    <span> {formatDate(record?.lastTimeLogin, "D MMM YYYY h:mm a") ?? "-"} </span>
                </>}/>
                <Column title="Company" dataIndex={['company', 'name']}/>
                <Column title="Role" dataIndex={"roleName"}/>

                <Column
                    title={'Action'}
                    render={((record: any) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.config.userForm}/>
                                <TlaDelete title={'user account'} column={record?.id} callBack={deleteUser}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Users
