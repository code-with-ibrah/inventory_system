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







    home: {
        index: "/",
        awards: '/awards',
        category: '/category',
        contestant: '/contestant',
        votePage: "/vote",
        results: "/result",
        about: "/about",
        ticket: "/ticket",
        contact: "/contact",
        contestantInfo: "/contestant-info/:uniqueCode",
        search: "/search",
        nominationForm: "/contestant-form",
        currentNominationForm: "nomination-form",
        nominationSuccess: "/nomination-success",
        payment: {
            verification: "/payment-verification",
            success: "/payment-success",
            failure: "/payment-failure",
        }
    },

    admin: {
        dashboard: '/admin/',
        paymentEditForm: "/admin/payment-edit-form",
        nomination: "/admin/nomination",
        ussdVerification: "/admin/ussd-verification",
        award: {
            index: '/admin/awards',
            form: '/admin/awards/form',
            printAwards: "/admin/awards/print",
            details: {
                index: '/admin/awards/detail',
                contestants: "/admin/awards/detail/contestants",
                categories: "/admin/awards/detail/categories",
                bonus: "/admin/awards/detail/bonus",
                bonusForm: "/admin/awards/detail/bonus-form",
                bonusDateForm: "/admin/awards/detail/bonus-date-form",
                stats: "/admin/awards/detail/stats",
                history: "/admin/awards/detail/history",
            }
        },
        organisation: {
            index: "/admin/organisations",
            form: '/admin/organisations/form',
        },
        category: {
            index: '/admin/category',
            form: '/admin/category/form',
            details: {
                index: '/admin/category/details',
                contestants: '/admin/category/details',
                results: '/admin/category/details/results',
            }
        },
        contestant: {
            index: '/admin/contestant',
            form: '/admin/contestant/form',

            details: {
                index: '/admin/contestant/details',
                personalInfo: '/admin/contestant/details/personal-info',
                voteRecords: '/admin/contestant/details/vote-records',
                manage: "/admin/contestant/details/manage",
            },
            voteRecords: "/admin/contestant/details/vote-records",
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


    organisation: {
        dashboard: '/organisation',
        award: {
            index: '/organisation/awards',
            form: '/organisation/awards/form',
            details: {
                index: '/organisation/awards/details',
                contestants:{
                    index: '/organisation/awards/details/contestants',
                    form: '/organisation/awards/details/contestants',
                },
                category: {
                    index: '/organisation/awards/details/categories',
                    form: '/organisation/awards/details/category-form',
                },
                bonus: {
                    index: '/organisation/awards/details/bonus',
                    form: '/organisation/awards/details/bonus-form',
                },
                stats: {
                    index: '/organisation/awards/details/stats',
                    form: '/organisation/awards/details/stats-form'
                },
                payment: {
                    index: '/organisation/awards/details/payment',
                }
            }
        },

        category: {
            contestants: '/organisation/awards/details/categories/index/contestants',
            details: '/organisation/awards/details/categories/index',
            results: '/organisation/awards/details/categories/index/results',
        },

        profile: {
            index: '/organisation/profile/',
            editForm: '/organisation/profile/info-form',
            changePasswordForm: '/organisation/profile/change-password',
        },
        nomination: "/organisation/nominations",
        users: "/organisation/users",
        userForm: "/organisation/user-form"

    },


    dashboard: "/dashboard",


    auth: {
        login: "/login",
        register: "/register",
        logout: "/logout"
    },


};
