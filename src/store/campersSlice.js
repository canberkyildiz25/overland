import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from '../services/api.js';

export const loadCampers = createAsyncThunk(
  'campers/load',
  async (filters, { rejectWithValue }) => {
    try {
      // Boş string olan filtreleri query'den çıkar
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== false && v != null)
      );
      return await fetchCampers(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const PAGE_SIZE = 4;

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    visibleCount: PAGE_SIZE,
    loading: false,
    error: null,
    filters: {
      location: '',
      form: '',        // araç tipi: panelTruck | fullyIntegrated | alcove | van
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
      radio: false,
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = {
        location: '',
        form: '',
        AC: false,
        kitchen: false,
        bathroom: false,
        TV: false,
        radio: false,
      };
    },
    showMore(state) {
      state.visibleCount += PAGE_SIZE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
        state.visibleCount = PAGE_SIZE;
      })
      .addCase(loadCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, showMore } = campersSlice.actions;
export default campersSlice.reducer;
