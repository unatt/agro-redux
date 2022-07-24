import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/category')
    if (!response.ok || response.status !== 200) {
      throw new Error(`error loading categories`)
    }
    const categories = await response.json()
    return categories
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return rejectWithValue(err.message)
  }
})

const categoriesSLice = createSlice({
  name: 'categories',
  initialState: { categories: [], loading: 'idle' },
  reducers: {
    addCategories(state, action) {
      state.categories = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.loading = 'success'
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'error'
        console.log(action.payload)
      })
  },
})

export const categoriesActions = categoriesSLice.actions

export default categoriesSLice
