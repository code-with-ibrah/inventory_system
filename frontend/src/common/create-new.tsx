import React from 'react';
import  { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import {FiPlus} from "react-icons/fi";

const items: MenuProps['items'] = [
    // {
    //     key: '1',
    //     label: (
    //         <TlaOpen modal={true} to={MenuLinks.dioceseForm}>New Diocese</TlaOpen>
    //     ),
    // },
    // {
    //     key: '2',
    //     label: (
    //         <TlaOpen modal={true} to={MenuLinks.circuitForm}>New Circuit</TlaOpen>
    //     ),
    // },
    // {
    //     key: '3',
    //     label: (
    //         <TlaOpen modal={true} to={MenuLinks.societyForm}>New Society</TlaOpen>
    //     ),
    // }
];

const CreateNew: React.FC = () => (
    <Dropdown menu={{ items }}>
        <Button className={'new-button'} icon={<FiPlus/>} size={'large'}>New</Button>
    </Dropdown>
);

export default CreateNew;
