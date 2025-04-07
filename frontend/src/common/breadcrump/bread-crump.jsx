import React from "react";
import {Breadcrumb } from "antd";


const BreadCrump = ({ menuItems }) => {

    menuItems = [
        {
            title: 'Home',
        },
        {
            title: <a href="">Application Center</a>,
        },
        {
            title: <a href="">Application List</a>,
        },
        {
            title: 'An Application',
        },
    ];

    return <Breadcrumb
        items={menuItems}
    />

};


export default BreadCrump