export const MenuLinks = {
    forgotPassword: '/forgot-password',
    login: '/login',
    changePassword: '/change-password',
    acceptInvite: '/invitation/:token/accept',
    manual: '/verify/manual',
    setNewPassword: '/reset-password',
    verifyPasswordReset: '/verify-password-reset',
    verified: '/verify/verified',
    analytics: '/home',
    register: "/register",




    admin: {
        dashboard: '/admin/',
        stocks: {

        },
        product: {
            index: "/admin/products",
            form: "/admin/product/product-form"
        },
        config: {
            details: {
                index: '/admin/config/details',
                users: '/admin/config/details/users',
                userForm: '/admin/config/details/user-form',
                roles: '/admin/config/details/roles',
                roleForm: '/admin/config/details/role-form',
            }
        }
    },



    company: {
        dashboard: '/company',
    },


};
