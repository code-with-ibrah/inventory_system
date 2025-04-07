import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import {FiMoreHorizontal} from "react-icons/fi";

interface Props {
    items: MenuProps['items']
}

const TableActions: React.FC<Props> = ({items}) => {

    return (
        <Dropdown menu={{ items }}>
            <FiMoreHorizontal className={'cursor-pointer'}/>
        </Dropdown>
    )
};

export default TableActions;