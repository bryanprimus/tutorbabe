import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

type AuthState = {
	user: User | null;
	initialized: boolean;
};

const initialState: AuthState = {
	user: null,
	initialized: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
			state.initialized = true;
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
