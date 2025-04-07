import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "./auth/authSlice.ts"
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import errorSlice from "./errorSlice.ts";
import usersSlice from "./users/usersSlice.ts";
import analyticsSlice from "./analytics/analyticsSlice.ts";
import classesSlice from "./classes/classesSlice";
import eventSlice from "./events/eventSlice.ts";
import awardSlice from "./award/awardSlice.ts";
import categorySlice from "./category/categorySlice.ts";
import commonSlice from "./common/commonSlice.ts";
import contestantSlice from "./contestant/contestantSlice.ts";
import organisationSlice from "./organisations/organisationSlice.ts";
import awardBonusSlice from "./award-bonus/awardBonusSlice.ts";
import shareSlice from "./share/shareSlice.ts";
import paymentSlice from "./payment/paymentSlice.ts";
import roleSlice from "./role/roleSlice.ts";
import dashboardSlice from "./dashboard/dashboardSlice.ts";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['errors']
}

const rootReducers = combineReducers({
    errors: errorSlice,
    analytics: analyticsSlice,
    classes: classesSlice,
    events: eventSlice,


    // new ones
    auth: authSlice,
    users: usersSlice,
    award: awardSlice,
    category: categorySlice,
    loader: commonSlice,
    contestant: contestantSlice,
    organisation: organisationSlice,
    awardBonusPackage: awardBonusSlice,
    payment: paymentSlice,
    percentageShare: shareSlice,
    role: roleSlice,
    dashboardCounter: dashboardSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: false
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
