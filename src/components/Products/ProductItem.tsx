import React from 'react'
import styles from './ProductItem.module.scss'
import { Product } from '../../store/products-slice'

interface ProductsItemProps {
  product: Product
}

const ProductItem: React.FC<ProductsItemProps> = ({ product }) => {
  const productImage = `./images/${product.categoryName}.png`

  const isNewBadge = product.isNew ? <div className={styles.newBadge}>New</div> : null
  const isLimitedBadge = product.isLimited ? <div className={styles.limitedBadge}>Limited</div> : null

  const discount = product.discount && <div className={styles.discount}>Discount ${product.discount} per bag</div>
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img src={productImage} alt={product.categoryName} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.product__description}>
          <div className={styles.category}>{product.categoryName}</div>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.description}>{product.description}</div>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.price}>{`$${product.price.toFixed(2)}`}</div>
          {discount}
        </div>
      </div>
      <div className={styles.badgesContainer}>
        {isLimitedBadge}
        {isNewBadge}
      </div>
    </div>
  )
}

export default ProductItem
