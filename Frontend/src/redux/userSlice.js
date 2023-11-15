import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    nickname: '',
    gitUrl: '',
    profileImage: '',
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.gitUrl = action.payload.gitUrl;
      state.profileImage = action.payload.profileImage;
      state.isLogin = true;
    },

    logout: (state) => {
      state.id = '';
      state.name = '';
      state.nickname = '';
      state.gitUrl = '';
      state.profileImage = '';
      state.isLogin = false;

      localStorage.removeItem('at');
      localStorage.removeItem('rt');
    },

    updateNickname: (state, action) => {
      state.nickname = action.payload.nickname;
    },
  },
});

export const { login, logout, updateNickname } = userSlice.actions;
export default userSlice.reducer;
