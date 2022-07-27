import { configureStore } from '@reduxjs/toolkit'

import filterSLice from './filter-slice'
import categoriesSLice from './categories-slice'
import productsSLice from './products-slice'

const store = configureStore({
  reducer: { products: productsSLice.reducer, filter: filterSLice.reducer, categories: categoriesSLice.reducer },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
