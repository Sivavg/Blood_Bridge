import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', userData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
    showDialog: false,  // Always start as false
    dialogMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.showDialog = false;
      state.dialogMessage = '';
      localStorage.removeItem('user');
    },
    closeDialog: (state) => {
      state.showDialog = false;
      state.dialogMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.showDialog = false;  // Reset before login
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.showDialog = true;  // Show dialog immediately
        state.dialogMessage = 'Login Successful! Welcome back!';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.showDialog = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.showDialog = false;  // Reset before register
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.showDialog = true;  // Show dialog immediately
        state.dialogMessage = 'Registration Successful! Welcome!';
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.showDialog = false;
      });
  },
});

export const { logout, closeDialog } = authSlice.actions;
export default authSlice.reducer;
