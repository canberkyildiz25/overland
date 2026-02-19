import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan favorileri yükle
function loadFavorites() {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem('favorites', JSON.stringify(ids));
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: loadFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
      saveFavorites(state.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
