import React from "react";
import {FiHome, FiPhoneCall, FiSettings, FiUser} from "react-icons/fi";
import {LuChurch} from "react-icons/lu";
import {FaEarthAfrica} from "react-icons/fa6";
import {SiCircuitverse, SiGoogleanalytics, SiGoogleclassroom} from "react-icons/si";
import {GiPayMoney, GiReceiveMoney, GiStorkDelivery, GiVote} from "react-icons/gi";
import {MdEditNote, MdOutlineMergeType, MdOutlineWarehouse} from "react-icons/md";
import {IoAddCircleOutline} from "react-icons/io5";
import {BiCategory, BiChart} from "react-icons/bi";
import {HistoryOutlined, StockOutlined} from "@ant-design/icons";
import {CgDialpad} from "react-icons/cg";
import { MdStorefront } from "react-icons/md";
import { PiStorefrontThin } from "react-icons/pi";
import {TbBrandX} from "react-icons/tb";



export const appIconLabels = {
    home: 'home',
    user: 'user',
    config: 'config',
    contact: 'contact',
    funds: 'funds',
    payment: 'add',
    category: 'category',
    graph: 'graph',

    diocese: 'diocese',
    circuits: 'circuits',
    analytics: 'analytics',
    contributions: 'contributions',
    contributionTypes: 'contributionTypes',
    classes: 'classes',
    attendance: 'attendance',
    history: 'history',
    nomination: 'nomination',
    ussd: 'ussd',


    stocks: 'stocks',
    products: 'products',
    brand: "brand",
    stockUnit: "stockUnit",
    supplier: "supplier",
    warehouse: "warehouse",


};




export const appIcons: { [key: string]: React.ReactNode } = {
    home: <FiHome/>,
    user: <FiUser/>,
    config: <FiSettings/>,
    add: <IoAddCircleOutline/>,
    contact: <FiPhoneCall/>,
    payment: <GiReceiveMoney/>,

    diocese: <FaEarthAfrica/>,
    circuits: <SiCircuitverse/>,
    societies: <LuChurch/>,
    analytics: <SiGoogleanalytics/>,
    contributions: <GiPayMoney/>,
    contributionTypes: <MdOutlineMergeType/>,
    classes: <SiGoogleclassroom/>,
    attendance: <MdEditNote/> ,
    graph: <BiChart/>,
    history: <HistoryOutlined/>,
    category: <BiCategory/>,
    nomination: <GiVote/>,
    ussd: <CgDialpad/>,

    stocks: <MdStorefront/>,
    products: <PiStorefrontThin />,
    brand: <TbBrandX/>,
    stockUnit: <StockOutlined/>,
    supplier: <GiStorkDelivery/>,
    warehouse: <MdOutlineWarehouse />
};



