import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type Product = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  categoryType: string
  isLimited: boolean
  isNew: boolean
  price: number
  discount: number | null
}

interface ProductsState {
  products: Product[]
  loading: 'idle' | 'loading' | 'success' | 'error'
}

const initialState: ProductsState = { products: [], loading: 'idle' }

export const fetchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  'products/fetchProducts',
  async (serializedFilter, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/product?${serializedFilter}`)
      if (!response.ok || response.status !== 200) {
        throw new Error(`error loading Products`)
      }
      const data = await response.json()
      return data.results
    } catch (err) {
      let errorMessage = 'An unknown error occured'
      if (err instanceof Error) {
        errorMessage = err.message
      }
      return rejectWithValue(errorMessage)
    }
  }
)

const productsSLice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = 'success'
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = 'error'
      })
  },
})

export const productsActions = productsSLice.actions

export default productsSLice
