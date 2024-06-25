import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appViewReducer from "./appView";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["appView"],
};

const reducer = combineReducers({
    appView: appViewReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;