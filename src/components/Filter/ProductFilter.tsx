import React from 'react'
import styles from './ProductFilter.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { filterActions } from '../../store/filter-slice'
import { fetchCategories } from '../../store/categories-slice'

interface ProductsFilterProps {
  onRetry: VoidFunction
}

const ProductFilter: React.FC<ProductsFilterProps> = () => {
  const dispatch = useAppDispatch()
  const { categories, loading } = useAppSelector(state => state.categories)
  const productsLoadingStatus = useAppSelector(state => state.products.loading)

  const isFilterDisabled = productsLoadingStatus === 'loading'

  const filter = useAppSelector(state => state.filter.filter)
  const handleFilterIsNewUpdate = () => {
    dispatch(filterActions.toggleFilterStatus('isNew'))
  }

  const handleFilterIsLimitedUpdate = () => {
    dispatch(filterActions.toggleFilterStatus('isLimited'))
  }

  const categoryFilterHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(filterActions.changeFilterCategory((event.target as Element).id))
  }

  const retryHandler = () => {
    dispatch(fetchCategories())
  }

  const clearSearchHandler = () => {
    dispatch(filterActions.clearFilter())
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterTitle}>
        <div className={styles.filterIcon}></div>
        <div>Filter</div>
      </div>
      <div className={styles.catTitle}>Category</div>
      <div className={styles.statusTitle}>Status </div>

      <div className={styles.categories}>
        {loading === 'loading' && <div className={styles.message}>Loading categories...</div>}
        {loading === 'success' && (
          <>
            {' '}
            <button
              id="all"
              className={filter.category.length === 0 ? `${styles.btn} ${styles['btn--selected']}` : styles.btn}
              onClick={clearSearchHandler}
              disabled={isFilterDisabled}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                id={category.id}
                onClick={categoryFilterHandler}
                disabled={isFilterDisabled}
                className={
                  filter.category.includes(category.id) ? `${styles.btn} ${styles['btn--selected']}` : styles.btn
                }
              >
                {category.name}
              </button>
            ))}
          </>
        )}

        {loading === 'error' && (
          <>
            <button className={`${styles.btn} ${styles['btn--error']}`} onClick={retryHandler}>
              Retry loading categories
            </button>
          </>
        )}
      </div>

      <div className={styles.status}>
        <div className={styles.myCheckbox}>
          <input
            id="is_limited"
            type="checkbox"
            onChange={handleFilterIsLimitedUpdate}
            checked={filter.isLimited}
            disabled={isFilterDisabled}
          />
          <label htmlFor="is_limited">Limited</label>
        </div>
        <div className={styles.myCheckbox}>
          <input
            id="is_new"
            type="checkbox"
            onChange={handleFilterIsNewUpdate}
            checked={filter.isNew}
            disabled={isFilterDisabled}
          />
          <label htmlFor="is_new">New</label>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
