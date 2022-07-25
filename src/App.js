// import ProductList from './components/ProductList/ProductList'
import ProductFilter from './components/Filter/ProductFilter'
import ProductSearch from './components/Filter/ProductsSearch'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchCategories } from './store/categories-slice'
import { fetchItems } from './store/items-slice'
import ProductsList from './components/Products/ProductsList'

import './App.scss'

function App() {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter.filter)

  const serializeFilter = filter =>
    [
      ...filter.category.map(categoryId => `category[]=${categoryId}`),
      `isNew=${filter.isNew}`,
      `isLimited=${filter.isLimited}`,
      `search=${filter.search}`,
    ].join('&')

  const retryHandler = () => {
    dispatch(fetchCategories())
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchItems(serializeFilter(filter)))
  }, [dispatch, filter])

  return (
    <>
      <ProductSearch />
      <div className="main">
        <ProductFilter onRetry={retryHandler} />
        {/* <ProductList /> */}
        <ProductsList />
      </div>
    </>
  )
}

export default App
