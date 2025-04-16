import { Route, Routes } from "react-router-dom";
import { MenuLinks } from "../../utils/menu-links";
import UserForm from "../../pages/admin-page/config/users/user-form.tsx";
import RoleForm from "../../pages/admin-page/config/roles/role-form.tsx";
import ProductForm from "../../pages/product/product-form.tsx";


export const ModalRoute = () => {
    return (
        <Routes>
            <Route path={MenuLinks.admin.config.details.userForm} element={<UserForm/>}/>
            <Route path={MenuLinks.admin.config.details.roleForm} element={<RoleForm/>}/>
            {/*<Route path={MenuLinks.organisation.profile.changePasswordForm} element={<ChangePasswordForm/>}/>*/}
            {/*<Route path={MenuLinks.organisation.profile.editForm} element={<OrganisationEditProfileForm/>} />*/}
            {/*<Route path={MenuLinks.organisation.userForm} element={<OrganisationUserForm/>}/>*/}

            <Route path={MenuLinks.admin.product.form} element={<ProductForm/>}/>

        </Routes>
    )
}
