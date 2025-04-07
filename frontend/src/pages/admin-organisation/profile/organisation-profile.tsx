import React from "react";
import {useAppSelector} from "../../../hooks";
import SingleItem from "../dashboard/single-item.tsx";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {Button} from "antd";
import {FiPlusCircle, FiRefreshCcw} from "react-icons/fi";

const OrganisationProfile: React.FC = () => {
    const user = useAppSelector(state => state.auth.user);


    // @ts-ignore
    return (
        <div className={''}>
            <div className="px-5 flex justify-end gap-3">
                <TlaOpen to={MenuLinks.organisation.profile.editForm}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Edit</Button>
                </TlaOpen>

                <TlaOpen to={MenuLinks.organisation.profile.changePasswordForm}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiRefreshCcw/>}>Change Password</Button>
                </TlaOpen>
            </div>

            <div className={'flex justify-between bg-white p-5 rounded-xl border my-5'}>
                <SingleItem title={'Name'} value={user?.name}/>
                <SingleItem title={'Email'} value={user?.email}/>
                <SingleItem title={'Organisation'} value={
                    // @ts-ignore
                     user?.organisation?.name
                }/>
                <SingleItem title={'Phone'} value={
                    // @ts-ignore
                    (user?.organisation?.phone) ?? <center>-</center>}
                />
            </div>

        </div>
    )
}

export default OrganisationProfile
