import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {createUser, updateUser} from "../../../../state/users/usersActions";
import {TlaError, TlaSuccess} from "../../../../utils/messages.ts";
import {useAppDispatch} from "../../../../hooks";
import {TlaModal} from "../../../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../../../common/dropdown-search.tsx";
import {Organisation} from "../../../../types/organisation.ts";
import {getAllOrganisations} from "../../../../state/organisations/organisationsAction.ts";
import {getAllRoles} from "../../../../state/role/rolesAction.ts";
import {Role} from "../../../../types/role.ts";

const UserForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
        const defaultPassword = "000000";
        values.passwordChanged = false;
        values.password = defaultPassword;

        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateUser({ data: values, id: state?.data?.id})) : dispatch(createUser(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(-1);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    };



    return (
        <TlaModal title={"User Form"} loading={loading}>
            <Form form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item className={'col-span-2'}
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"name"} label={"Name *"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={"organisationId"} label={"Organisation"}>
                        <DropdownSearch
                            defaultValue={state?.data?.organisation?.name}
                            object
                            searchApi={getAllOrganisations}
                            placeholder="Search organisation name"
                            setResult={(organisation: Organisation) => {
                                if (organisation) {
                                    form.setFieldValue('organisationId', organisation.id)
                                    return
                                }

                                form.setFieldValue('organisationId', null)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                type: "email",
                                message: "Not a valid email"
                            }
                        ]}
                        name={"email"} label={"Email"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"phone"} label={"Phone Number"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"roleId"} label={"Role"}>
                        <DropdownSearch
                            defaultValue={state?.data?.roleName}
                            object
                            searchApi={getAllRoles}
                            placeholder="Search role name"
                            setResult={(role: Role) => {
                                if (role) {
                                    form.setFieldValue('roleId', role.id)
                                    return
                                }

                                form.setFieldValue('roleId', null)
                            }}
                        />
                    </Form.Item>

                </div>
                <Button block className={'btn-red'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default UserForm
