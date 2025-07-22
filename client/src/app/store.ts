//import {version} from "react"
import storage from "redux-persist/lib/storage"
import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { usersAPI } from "../Features/users/usersAPI";
import { persistReducer, persistStore } from "redux-persist";
import { loginAPI } from '../Features/login/loginAPI'
import userSlice from "../Features/login/userSlice";
import { bookingApi } from "../Features/bookings/bookingAPI";
import { paymentApi } from "../Features/payment/paymentAPI";
import { roomsApi } from "../Features/rooms/roomAPI";
import { hotelApi } from "../Features/hotels/hotelAPI";



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
[usersAPI.reducerPath]: usersAPI.reducer,
[loginAPI.reducerPath]: loginAPI.reducer,
[bookingApi.reducerPath]: bookingApi.reducer,
[paymentApi.reducerPath]: paymentApi.reducer,
[roomsApi.reducerPath]: roomsApi.reducer,
[hotelApi.reducerPath]: hotelApi.reducer,
user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(usersAPI.middleware)
        .concat(loginAPI.middleware) // add the loginAPI middleware
        .concat(bookingApi.middleware)
        .concat(paymentApi.middleware)
            .concat(roomsApi.middleware)
            .concat(hotelApi.middleware)
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;