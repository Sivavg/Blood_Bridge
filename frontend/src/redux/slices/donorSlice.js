import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDonors = createAsyncThunk(
  'donors/fetchDonors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/donors');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMyProfile = createAsyncThunk(
  'donors/fetchMyProfile',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/donors/my-profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addDonor = createAsyncThunk(
  'donors/addDonor',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/donors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  'donors/updateMyProfile',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/donors/my-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDonor = createAsyncThunk(
  'donors/updateDonor',
  async ({ id, formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/donors/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteDonor = createAsyncThunk(
  'donors/deleteDonor',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/donors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const donorSlice = createSlice({
  name: 'donors',
  initialState: {
    donors: [],
    myProfile: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.loading = false;
        state.donors = action.payload;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
      })
      .addCase(addDonor.fulfilled, (state, action) => {
        state.donors.unshift(action.payload);
        state.myProfile = action.payload;
        state.successMessage = 'Donor profile created successfully!';
      })
      .addCase(addDonor.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
        const index = state.donors.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.donors[index] = action.payload;
        }
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateDonor.fulfilled, (state, action) => {
        const index = state.donors.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.donors[index] = action.payload;
        }
      })
      .addCase(deleteDonor.fulfilled, (state, action) => {
        state.donors = state.donors.filter((d) => d._id !== action.payload);
      });
  },
});

export const { clearMessages } = donorSlice.actions;
export default donorSlice.reducer;
