import { sdkApi } from "@/apis";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const makeStore = () =>
	configureStore({
		reducer: {
			// Add the generated reducer as a specific top-level slice
			[sdkApi.reducerPath]: sdkApi.reducer,
		},
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(sdkApi.middleware),
	});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
const listeners = makeStore().dispatch;
setupListeners(listeners);
