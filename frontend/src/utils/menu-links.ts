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
            form: "/admin/products/form",
            formPage: "/admin/products/form-page",
            details: {
                index: "/admin/products/details",
                suppliers: "/admin/products/details/suppliers",
                productSupplierForm: "/admin/products/details/add-suppliers-form",
            }
        },
        supplier: {
          index: "/admin/suppliers",
          form: "/admin/suppliers/form",
          details: {
              index: "/admin/suppliers/details",
              product: "/admin/suppliers/details/products",
              supplierProductForm: "/admin/suppliers/details/add-products-form",
          },
        },
        config: {
            details: {
                index: '/admin/config/details',
                users: '/admin/config/details/users',
                userForm: '/admin/config/details/user-form',
                roles: '/admin/config/details/roles',
                roleForm: '/admin/config/details/role-form'
            }
        },
        productSettings: {
            index: '/admin/product-settings/',
            category: '/admin/product-settings/category',
            categoryForm: '/admin/product-settings/category-form',
            brand: '/admin/product-settings/brands',
            brandForm: '/admin/product-settings/brands-form',
            stockUnit: '/admin/product-settings/stock-unit',
            stockUnitForm: '/admin/product-settings/stock-unit-form'
        }
    },



    company: {
        dashboard: '/company',
    },


};
