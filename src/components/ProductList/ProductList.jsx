import styles from './ProductList.module.scss'
import { useProductList } from '../../hooks/useProductList'
import { Fragment, useCallback, useState } from 'react'
import ProductItem from '../Products/ProductItem'
import ProductSearch from '../Products/ProductSearch'
import Spinner from '../UI/Spinner'
// import { useDispatch } from 'react-redux'

const ProductList = () => {
  // const dispatch = useDispatch()
  // const { items, filter, status, catStatus, updateFilter, categories, resetFilter, categoryRequest } = useProductList()
  const { items, status, catStatus, updateFilter } = useProductList()

  const [searchInput, setSearchInput] = useState('')

  // const handleFilterIsNewUpdate = () => {
  //   updateFilter({ isNew: !filter.isNew })
  //   dispatch(filterActions.toggleFilter('isNew'))
  // }

  // const handleFilterIsLimitedUpdate = () => {
  //   updateFilter({ isLimited: !filter.isLimited })
  //   dispatch(filterActions.toggleFilter('isLimited'))
  // }

  // const categoryFilterHandler = event => {
  //   const categoryToFilter = event.target.id
  //   if (!filter.category.includes(categoryToFilter)) {
  //     updateFilter({ category: [...filter.category, categoryToFilter] })
  //   } else {
  //     updateFilter({ category: [...filter.category.filter(category => category !== categoryToFilter)] })
  //   }
  //   dispatch(filterActions.changeFilterCategory(event.target.id))
  // }

  const searchHandler = useCallback(searchInput => updateFilter({ search: searchInput }), [updateFilter])

  // const clearSearchHandler = () => {
  //   setSearchInput('')
  //   resetFilter()
  //   dispatch(filterActions.clearFilter())
  // }

  const searchChangeHandler = value => {
    setSearchInput(value)
  }

  return (
    <Fragment>
      <ProductSearch
        onSearch={searchHandler}
        input={searchInput}
        onEdit={searchChangeHandler}
        disabled={status === 'work'}
      />

      <div className={styles.root}>
        <div>Status: {status}</div>
        <div>Status Cat: {catStatus}</div>

        {/* <div className={styles.filtersContainer}>
          <div className={styles.filterTitle}>
            <div className={styles.filterIcon}></div>
            <div>Filter</div>
          </div>
          <div className={styles.catTitle}>Category</div>
          <div className={styles.statusTitle}>Status</div>

          <div className={styles.categories}>
            <button
              id="all"
              className={filter.category.length === 0 ? `${styles.btn} ${styles['btn--selected']}` : styles.btn}
              onClick={clearSearchHandler}
              disabled={catStatus === 'work'}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                id={category.id}
                onClick={categoryFilterHandler}
                disabled={status === 'work'}
                className={
                  filter.category.includes(category.id) ? `${styles.btn} ${styles['btn--selected']}` : styles.btn
                }
              >
                {category.name}
              </button>
            ))}
            {catStatus === 'error' && (
              <button onClick={categoryRequest} className={styles.btn}>
                Retry
              </button>
            )}
          </div>

          <div className={styles.status}>
            <div className={styles.myCheckbox}>
              <input
                id="is_limited"
                type="checkbox"
                onChange={handleFilterIsLimitedUpdate}
                checked={filter.isLimited}
                disabled={status === 'work'}
              />
              <label htmlFor="is_limited">Limited</label>
            </div>
            <div className={styles.myCheckbox}>
              <input
                id="is_new"
                type="checkbox"
                onChange={handleFilterIsNewUpdate}
                checked={filter.isNew}
                disabled={status === 'work'}
              />
              <label htmlFor="is_new">New</label>
            </div>
          </div>
        </div> */}

        <div className={styles.itemsContainer}>
          {status === 'work' && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
          {status === 'error' && (
            <div className={styles.spinner}>
              <p>Error loading items</p>
              <button onClick={updateFilter} className={`${styles.btn} ${styles['btn--error']}`}>
                Retry
              </button>
            </div>
          )}

          {status === 'success' && items.map(item => <ProductItem key={item.id} item={item} />)}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList
