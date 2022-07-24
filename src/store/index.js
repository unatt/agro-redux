import { configureStore } from '@reduxjs/toolkit'

import itemsSLice from './items-slice'
import filterSLice from './filter-slice'
import categoriesSLice from './categories-slice'

const store = configureStore({
  reducer: { items: itemsSLice.reducer, filter: filterSLice.reducer, categories: categoriesSLice.reducer },
})

export default store
