import React, { useEffect } from 'react'
import styles from './ProductSearch.module.scss'

const ProductSearch = ({ onSearch, input, onEdit, disabled }) => {
  const searchInputChangeHandler = event => {
    onEdit(event.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [input, onSearch])

  return (
    <div className={styles.header}>
      <div className={styles.title}>Products</div>
      <div className={styles.inputContainer} disabled={disabled}>
        <div className={styles.search__icon}></div>
        <input
          id="search"
          type="text"
          placeholder="Search among products"
          value={input}
          onChange={searchInputChangeHandler}
          disabled={disabled}
        ></input>
        <label htmlFor="search"></label>
      </div>
    </div>
  )
}

export default ProductSearch
