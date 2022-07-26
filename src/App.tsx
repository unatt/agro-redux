import ProductFilter from './components/Filter/ProductFilter'
import ProductSearch from './components/Filter/ProductsSearch'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'

import { fetchCategories } from './store/categories-slice'
import { fetchItems } from './store/items-slice'
import ProductsList from './components/Products/ProductsList'
import { Filter } from './store/filter-slice'

import './App.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter.filter)

  const serializeFilter = (filter: Filter) =>
    [
      ...filter.category.map(categoryId => `category[]=${categoryId}`),
      `isNew=${filter.isNew}`,
      `isLimited=${filter.isLimited}`,
      `search=${filter.search}`,
    ].join('&')

  const retryHandler = () => {
    dispatch(fetchCategories())
  }

  const retryFetchItemsHandler = () => {
    dispatch(fetchItems(serializeFilter(filter)))
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchItems(serializeFilter(filter)))
  }, [dispatch, filter])
  return (
    <div>
      <ProductSearch />
      <div className="main">
        <ProductFilter onRetry={retryHandler} />
        <ProductsList onRetry={retryFetchItemsHandler} />
      </div>
    </div>
  )
}

export default App
