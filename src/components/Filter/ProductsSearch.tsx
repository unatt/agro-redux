import React, { useState, useEffect, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'

import styles from './ProductsSearch.module.scss'
import { filterActions } from '../../store/filter-slice'

const ProductSearch = () => {
  const filter = useAppSelector(state => state.filter.filter)
  const { loading } = useAppSelector(state => state.products)

  const dispatch = useAppDispatch()

  const [searchInput, setSearchInput] = useState('')

  const searchInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
        <div className={styles.search__icon}></div>
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
