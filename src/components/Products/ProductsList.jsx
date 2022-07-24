import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../../store/items-slice'
import ProductItem from './ProductItem'
import Spinner from '../UI/Spinner'
import styles from './ProductsList.module.scss'

const ProductsList = () => {
  const dispatch = useDispatch()
  const retryHandler = () => {
    dispatch(fetchItems())
  }

  const { items, loading } = useSelector(state => state.items)
  return (
    <div className={styles.itemsContainer}>
      {loading === 'loading' && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {loading === 'error' && (
        <div className={styles.spinner}>
          <button onClick={retryHandler} className={`${styles.btn} ${styles['btn--error']}`}>
            Retry loading items
          </button>
        </div>
      )}
      {loading === 'success' && items.map(item => <ProductItem key={item.id} item={item} />)}
    </div>
  )
}

export default ProductsList
