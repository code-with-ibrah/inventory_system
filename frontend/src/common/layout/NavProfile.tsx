import { Dropdown, Space } from 'antd'
import { FiLogOut, FiMessageSquare, FiUser } from 'react-icons/fi'
import TlaOpen from "../pop-ups/TlaOpen.tsx";
import React from "react";
import { AiOutlineQuestion } from "react-icons/ai";
import Logout from "./logout.tsx";
import { useAppSelector } from "../../hooks";

const NavProfile = () => {
    const user = useAppSelector(state => state.auth.user)

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
        fontSize: 20
    };

    const items = [
       /* {
            key: 'account',
            icon: <FiSettings size={16}/>,
            label: (
                <TlaOpen data={user} modal={false} to={MenuLinks.teamSettings.index+"/"+MenuLinks.teamSettings.profile}>Settings</TlaOpen>
            )
        },*/
        {
            key: 'settings',
            icon: <AiOutlineQuestion size={16}/>,
            label: (
                <TlaOpen to={`/change-password`}>Help & Support</TlaOpen>
            )
        },
        {
            key: 'feedback',
            icon: <FiMessageSquare size={16}/>,
            label: (
                <TlaOpen to={`/change-password`}>Give Feedback</TlaOpen>
            )
        },
        {
            key: 'logOut',
            icon: <FiLogOut size={16}/>,
            label: <Logout>Logout</Logout>
        }
    ]

    return (
        <Dropdown
            menu={{items}}
            dropdownRender={(menu) => (
                <div className={"bg-app-red w-[230px] rounded-lg no-print"}>
                    <Space className={'text-white p-4'}>
                        <div className={"border h-10 w-10 rounded-full flex items-center justify-center"}>
                            <FiUser size={20}/>
                        </div>
                        <div>
                            <p className={'m-0 -mb-2'}>
                                {user && (`${user?.name.toLowerCase()}`)}
                            </p>
                            <small className={'text-white font-medium'}>{user?.email}</small>
                        </div>
                    </Space>
                    <hr className={'w-[90%] mx-auto'}/>
                    {React.cloneElement(menu as React.ReactElement, {style: menuStyle})}
                </div>
            )}
        >
            <a className={"border h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"}
               onClick={(e) => e.preventDefault()}>
                <FiUser size={20}/>
            </a>
        </Dropdown>
    );
}

export default NavProfile
