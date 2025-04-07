import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { FiPlus } from "react-icons/fi";
import TlaOpen from "../pop-ups/TlaOpen.tsx";

const items: MenuProps['items'] = [
    {
        key: 'teams',
        label: (<TlaOpen to={'/teams/form'}>New Team</TlaOpen>),
    },
    {
        key: 'commentaries',
        label: (<TlaOpen to={'/commentaries/form'}>New Game</TlaOpen>),
    },
    {
        key: 'audios',
        label: (<TlaOpen to={'/audios/form'}>New Audio</TlaOpen>),
    },
    {
        key: 'users',
        label: (<TlaOpen to={'/users/form'}>New User</TlaOpen>),
    },
    {
        key: 'issues',
        label: (<TlaOpen to={'/home/form'}>New Issue</TlaOpen>),
    }
];

const CreateNew: React.FC = () => (
    <Dropdown menu={{ items }} className={'no-print'}>
        <Button icon={<FiPlus/>} className={'rounded-full btn-flex bg-gray-800 border-gray-500 text-gray-300 hover:!bg-gray-900 hover:!border-gray-500 hover:!text-gray-300'}>
            New
        </Button>
    </Dropdown>
);

export default CreateNew;
