import { Session } from '@ory/client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  session?: Session;
  logoutUrl?: string;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(
      state,
      action: PayloadAction<{ session: Session; logoutUrl: string }>
    ) {
      state.session = action.payload.session;
      state.logoutUrl = action.payload.logoutUrl;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
