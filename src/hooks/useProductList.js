import { useCallback, useEffect, useReducer } from 'react'

const initialState = {
  filter: {
    isNew: false,
    isLimited: false,
    category: [],
    search: '',
  },
  status: 'idle', // idle | work | success | error
  catStatus: 'idle',
  items: [],
  categories: [],
}
const reducer = (state, action) => {
  // console.log(`Action: ${action.type}; Payload:`, action.payload)
  switch (action.type) {
    case 'filter:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    }
    case 'filter:reset': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...initialState.filter,
        },
      }
    }
    case 'request:start': {
      return {
        ...state,
        status: 'work',
      }
    }
    case 'requestCategory:start': {
      return {
        ...state,
        catStatus: 'work',
      }
    }
    case 'request:success': {
      return {
        ...state,
        status: 'success',
        items: action.payload,
      }
    }
    case 'requestCategory:success': {
      return {
        ...state,
        catStatus: 'success',
        categories: action.payload,
      }
    }
    case 'request:error': {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'requestCategory:error': {
      return {
        ...state,
        catStatus: 'error',
      }
    }
  }
}
export const useProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const updateFilter = useCallback((filter = {}) => {
    dispatch({ type: 'filter:change', payload: filter })
  }, [])
  const resetFilter = useCallback(() => dispatch({ type: 'filter:reset' }), [])

  const performRequest = useCallback(async () => {
    dispatch({ type: 'request:start' })
    // prettier-ignore
    const serializeFilter = filter => [
      ...filter.category.map(categoryId => `category[]=${categoryId}`),
      `isNew=${filter.isNew}`,
      `isLimited=${filter.isLimited}`,
      `search=${filter.search}`

    ].join('&')

    try {
      const response = await fetch(`/api/product?${serializeFilter(state.filter)}`)
      if (!response.ok || response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`)
      }
      const data = await response.json()
      // console.log(data)
      dispatch({ type: 'request:success', payload: data.results })
    } catch (error) {
      console.error(error)
      dispatch({ type: 'request:error' })
    }
  }, [state.filter])

  const categoryRequest = useCallback(async () => {
    dispatch({ type: 'requestCategory:start' })
    try {
      const response = await fetch('/api/category')
      if (!response.ok || response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`)
      }
      const categories = await response.json()
      // console.log(categories)
      dispatch({
        type: 'requestCategory:success',
        payload: categories.map(cat => ({ ...cat, img: `../../assets${cat.name}.png` })),
      })
    } catch (error) {
      console.error(error)
      dispatch({ type: 'requestCategory:error' })
    }
  }, [])

  useEffect(() => {
    categoryRequest()
  }, [categoryRequest])

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
    updateFilter,
    resetFilter,
    categoryRequest,
  }
}
