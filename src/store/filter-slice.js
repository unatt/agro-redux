import { createSlice } from '@reduxjs/toolkit'

const initialFilter = { isNew: false, isLimited: false, category: [], search: '' }

const filterSLice = createSlice({
  name: 'filter',
  initialState: { filter: initialFilter },
  reducers: {
    changeFilterCategory(state, action) {
      if (state.filter.category.includes(action.payload)) {
        state.filter.category = state.filter.category.filter(category => category !== action.payload)
      } else {
        state.filter.category.push(action.payload)
      }
    },
    toggleFilter(state, action) {
      state.filter[action.payload] = !state.filter[action.payload]
    },
    clearFilter(state) {
      state.filter = initialFilter
    },
    changeFilterSearch(state, action) {
      state.filter.search = action.payload
    },
  },
})

export const filterActions = filterSLice.actions

export default filterSLice
