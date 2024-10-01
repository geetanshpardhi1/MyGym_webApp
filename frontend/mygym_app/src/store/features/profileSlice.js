import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

export const fetchProfileData = createAsyncThunk('profile/fetchProfileData', async (_, thunkAPI) => {
  try {
    const response = await api.get('/users/profile/');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateProfileData = createAsyncThunk('profile/updateProfileData', async (profileData, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      if (profileData[key]) {
        formData.append(key, profileData[key]);
      }
    });
    const response = await api.patch('/users/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileData = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileData = action.payload;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
