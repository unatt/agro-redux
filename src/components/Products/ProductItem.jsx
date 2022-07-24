import React from 'react'
import styles from './ProductItem.module.scss'

const ProductItem = ({ item }) => {
  const itemImage = `./images/${item.categoryName}.png`

  const isNewBadge = item.isNew ? <div className={styles.newBadge}>New</div> : null
  const isLimitedBadge = item.isLimited ? <div className={styles.limitedBadge}>Limited</div> : null

  let discount = item.discount && <div className={styles.discount}>Discount ${item.discount} per bag</div>
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img src={itemImage} alt={item.categoryName} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.product__description}>
          <div className={styles.category}>{item.categoryName}</div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.description}>{item.description}</div>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.price}>{`$${item.price.toFixed(2)}`}</div>
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
