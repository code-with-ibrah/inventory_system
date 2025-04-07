import { Route, Routes } from "react-router-dom";
import { MenuLinks } from "../../utils/menu-links.ts";
import UserForm from "../../pages/admin-page/config/users/user-form.tsx";
import OrganisationUserForm from "../../pages/admin-organisation/users/user-form.tsx";
import AwardForm from "../../pages/admin-page/awards/award-form.tsx";
import OrganisationForm from "../../pages/admin-page/organisations/organisation-form.tsx";
import CategoryForm from "../../pages/admin-page/awards/category-form.tsx";
import AwardBonusPackageForm from "../../pages/admin-page/award-bonus/award-bonus-package-form.tsx";
import BonusDateForm from "../../pages/admin-page/award-bonus/bonus-date-form.tsx";
import ContestantsForm from "../../pages/admin-page/awards/contestants-form.tsx";
import PaymentForm from "../../pages/admin-page/payment/payment-form.tsx";
import RoleForm from "../../pages/admin-page/config/roles/role-form.tsx";
import ChangePasswordForm from "../../pages/admin-organisation/profile/change-password-form.tsx";
import OrganisationEditProfileForm from "../../pages/admin-organisation/profile/organisation-edit-profile-form.tsx";


export const ModalRoute = () => {
    return (
        <Routes>
            <Route path={MenuLinks.admin.award.form} element={<AwardForm/>} />
            <Route path={MenuLinks.admin.award.details.bonusForm} element={<AwardBonusPackageForm/>} />
            <Route path={MenuLinks.admin.organisation.form} element={<OrganisationForm/>} />
            <Route path={MenuLinks.admin.category.form} element={<CategoryForm/>}/>
            <Route path={MenuLinks.admin.award.details.bonusDateForm} element={<BonusDateForm/>}/>
            <Route path={MenuLinks.admin.contestant.form} element={<ContestantsForm/>}/>
            <Route path={MenuLinks.admin.paymentEditForm} element={<PaymentForm/>}/>
            <Route path={MenuLinks.admin.config.details.userForm} element={<UserForm/>}/>
            <Route path={MenuLinks.admin.config.details.roleForm} element={<RoleForm/>}/>
            <Route path={MenuLinks.organisation.profile.changePasswordForm} element={<ChangePasswordForm/>}/>
            <Route path={MenuLinks.organisation.profile.editForm} element={<OrganisationEditProfileForm/>} />
            <Route path={MenuLinks.organisation.userForm} element={<OrganisationUserForm/>}/>

        </Routes>
    )
}
