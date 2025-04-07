import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import { useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {
    deleteOrganisation,
    getAllOrganisations,
    toggleActiveness
} from "../../../state/organisations/organisationsAction.ts";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";


const Organisations: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.organisation.organisation);




    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.organisation.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllOrganisations} data={data} filter={""} meta={meta}>
                <Column title="Name" dataIndex="name" />
                {/*<Column title="Code" dataIndex="organisationUserCode"/>*/}
                {/*<Column title="Date Joined" dataIndex="createdAt"/>*/}
                <Column title="Active Status" render={(record) => record?.isActive ? "Active" : "Not Active"} />
                {/* <Column title="Image" render={(record: Organisation) =>
                    <Image
                        className={'thumbnail-img'}
                        width={50}
                        src={record?.thumbnail}
                        preview={{
                            src: record?.image,
                        }}
                    />
                } /> */}
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.organisation.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'organisation'} column={record.id} callBack={deleteOrganisation}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <TlaToggleActive title={'organisation'} column={record.id} callBack={toggleActiveness}/>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Organisations
