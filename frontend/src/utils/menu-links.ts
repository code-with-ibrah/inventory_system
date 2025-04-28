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
                productSuppliersForm: "/admin/product-suppliers-form",
            }
        },
        supplier: {
          index: "/admin/suppliers",
          form: "/admin/suppliers/form",
          details: {
              index: "/admin/suppliers/details",
              product: "/admin/suppliers/details/products",
              supplierProductForm: "/admin/suppliers-product-form",
          }
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
        },
        warehouse: {
            index: "/admin/warehouses",
            form: "/admin/warehouse-form",
            details: "/admin/warehouses/details",
        },
        stock: {
            index: "/admin/stocks",
            form: "/admin/stock-form",
            details: "/admin/stocks/details",
        },
        stockAdjustment: {
            index: "/admin/stock-adjustments",
            form: "/admin/stock-adjustments/form",
            details: "/admin/stock-adjustments/details",
            items: "/admin/stock-adjustments/items",
            itemsForm: "/admin/stock-adjustments/items-form",
            singleItemForm: "/admin/stock-adjustments/single-items-form"
        },
        customers: {
            index: "/admin/customers",
            form: "/admin/customers/form"
        }

    },



    company: {
        dashboard: '/company',
    },


};
