import { mainApi, sdkApi } from "@/apis";
import authReducer from "@/store/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const makeStore = () =>
	configureStore({
		reducer: {
			// Add the generated reducer as a specific top-level slice
			auth: authReducer,
			[sdkApi.reducerPath]: sdkApi.reducer,
			[mainApi.reducerPath]: mainApi.reducer,
		},
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(sdkApi.middleware, mainApi.middleware),
	});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
const listeners = makeStore().dispatch;
export const store = makeStore();
setupListeners(listeners);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
