//import {version} from "react"
import storage from "redux-persist/lib/storage"
import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { usersAPI } from "../Features/users/usersAPI";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
[usersAPI.reducerPath]: usersAPI.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(usersAPI.middleware),
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;