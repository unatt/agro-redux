import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Filter = {
  isNew: boolean
  isLimited: boolean
  category: string[]
  search: string
}

const initialFilter: Filter = { isNew: false, isLimited: false, category: [], search: '' }

interface FilterState {
  filter: Filter
}

const initialState: FilterState = { filter: initialFilter }

export type InitialFilterState = typeof initialState

type FilterStatus = 'isNew' | 'isLimited'

const filterSLice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterCategory(state, action: PayloadAction<string>) {
      if (state.filter.category.includes(action.payload)) {
        state.filter.category = state.filter.category.filter(category => category !== action.payload)
      } else {
        state.filter.category.push(action.payload)
      }
    },
    toggleFilterStatus(state, action: PayloadAction<FilterStatus>) {
      state.filter[action.payload] = !state.filter[action.payload]
    },
    clearFilter(state) {
      state.filter = initialFilter
    },
    changeFilterSearch(state, action: PayloadAction<string>) {
      state.filter.search = action.payload
    },
  },
})

export const filterActions = filterSLice.actions

export default filterSLice
