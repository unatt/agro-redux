import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type Item = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  categoryType: string
  isLimited: boolean
  isNew: boolean
  price: number
  discount: number
}

interface ItemsState {
  items: Item[]
  loading: string
}

const initialState: ItemsState = { items: [], loading: 'idle' }

export const fetchItems = createAsyncThunk<Item[], string, { rejectValue: string }>(
  'items/fetchItems',
  async (serializedFilter, { rejectWithValue }) => {
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
      let errorMessage = 'An unknown error occured'
      if (err instanceof Error) {
        errorMessage = err.message
      }
      return rejectWithValue(errorMessage)
    }
  }
)

const itemsSLice = createSlice({
  name: 'items',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = 'success'
      })
      .addCase(fetchItems.rejected, state => {
        state.loading = 'error'
      })
  },
})

export const itemsActions = itemsSLice.actions

export default itemsSLice
