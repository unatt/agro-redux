import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

type Category = {
  id: string
  name: string
  type: string
}

interface CategoriesState {
  categories: Category[]
  loading: string
}

const initialState: CategoriesState = { categories: [], loading: 'idle' }

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
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
      let errorMessage = 'An unknown error occured'
      if (err instanceof Error) {
        errorMessage = err.message
      }
      return rejectWithValue(errorMessage)
    }
  }
)

const categoriesSLice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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
