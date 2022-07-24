import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchItems = createAsyncThunk('items/fetchItems', async (serializedFilter, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/product?${serializedFilter}`)
    if (!response.ok || response.status !== 200) {
      throw new Error(`error loading items`)
    }
    const data = await response.json()
    return data.results
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return rejectWithValue(err.message)
  }
})

const itemsSLice = createSlice({
  name: 'items',
  initialState: { items: [], loading: 'idle' },
  reducers: {
    addItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = 'success'
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = 'error'
        console.log(action.payload)
      })
  },
})

export const itemsActions = itemsSLice.actions

export default itemsSLice
