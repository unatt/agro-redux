import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ProductsSearch.module.scss'
import { filterActions } from '../../store/filter-slice'

const ProductSearch = () => {
  const filter = useSelector(state => state.filter.filter)
  const { loading } = useSelector(state => state.items)

  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('')

  const searchInputChangeHandler = event => {
    setSearchInput(event.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterActions.changeFilterSearch(searchInput))
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchInput, dispatch])

  useEffect(() => {
    if (filter.search === '') {
      setSearchInput('')
    }
  }, [filter])

  return (
    <div className={styles.header}>
      <div className={styles.title}>Products</div>
      <div className={styles.inputContainer}>
        <div className={styles.search__icon} disabled={loading !== 'success'}></div>
        <input
          id="search"
          type="text"
          placeholder="Search among products"
          value={searchInput}
          onChange={searchInputChangeHandler}
          disabled={loading !== 'success'}
        ></input>
        <label htmlFor="search"></label>
      </div>
    </div>
  )
}

export default ProductSearch
