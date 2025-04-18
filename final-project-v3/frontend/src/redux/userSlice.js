import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  favorites: [], // ✅ 新增收藏状态
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.favorites = []; 
    },
  },
});

export const { setUser, clearUser, setFavorites } = userSlice.actions;

export default userSlice.reducer;

