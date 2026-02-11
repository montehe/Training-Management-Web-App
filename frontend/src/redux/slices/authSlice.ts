import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  _id: string;  
  username: string;
  email: string;
  role?: string;
  tel?: string;
  adresse?: string;
  fonction?: 'etudiant' | 'employer';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  forgotPasswordStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  forgotPasswordError: string | null;
  resetPasswordStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  resetPasswordError: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
  forgotPasswordStatus: 'idle',
  forgotPasswordError: null,
  resetPasswordStatus: 'idle',
  resetPasswordError: null,
};

const saveAuthState = (user: User, token: string) => {
  localStorage.setItem('authUser', JSON.stringify(user));
  localStorage.setItem('authToken', token);
};

const loadAuthState = (): { user: User | null; token: string | null } => {
  const user = localStorage.getItem('authUser');
  const token = localStorage.getItem('authToken');
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

const persistedState = loadAuthState();
initialState.isAuthenticated = !!persistedState.token;
initialState.user = persistedState.user;
initialState.token = persistedState.token;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveAuthState(action.payload.user, action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthState(state.user, state.token || '');
      }
    },
    forgotPasswordRequest: (state) => {
      state.forgotPasswordStatus = 'loading';
      state.forgotPasswordError = null;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordStatus = 'succeeded';
    },
    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.forgotPasswordStatus = 'failed';
      state.forgotPasswordError = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.resetPasswordStatus = 'loading';
      state.resetPasswordError = null;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordStatus = 'succeeded';
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.resetPasswordStatus = 'failed';
      state.resetPasswordError = action.payload;
    },
  },
});

export const { 
  login, 
  logout, 
  updateProfile, 
  forgotPasswordRequest, 
  forgotPasswordSuccess, 
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

export type { AuthState };
