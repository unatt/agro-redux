import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchItems } from '../../store/items-slice'
import ProductItem from './ProductItem'
import Spinner from '../UI/Spinner'
import styles from './ProductsList.module.scss'
import { useAppSelector } from '../../hooks'

interface ProductsListProps {
  onRetry: VoidFunction
}

const ProductsList: React.FC<ProductsListProps> = ({ onRetry }) => {
  const retryHandler = () => {
    onRetry()
  }

  const { products, loading } = useAppSelector(state => state.products)
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
            Retry loading productss
          </button>
        </div>
      )}
      {loading === 'success' && products.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  )
}

export default ProductsList
