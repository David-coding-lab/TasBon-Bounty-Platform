import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { apiPost } from '../../services/api'

export const hydrateSession = createAsyncThunk(
  'auth/hydrateSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiPost('/api/v1/auth/refresh-token')

      const { user, accessToken } = data.data

      Cookies.set('session', accessToken, {
        expires: 1 / 96,
        secure: true,
        sameSite: 'Strict',
      })

      return { user, token: accessToken }
    } catch {
      Cookies.remove('session')
      return rejectWithValue('refresh failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateSession.pending, (state) => {
        state.loading = true
      })
      .addCase(hydrateSession.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(hydrateSession.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
      })
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
