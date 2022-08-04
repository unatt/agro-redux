import React from 'react'
import styles from './Spinner.module.scss'

const Spinner = () => {
  const innerDivArray = new Array(12).fill('')

  return (
    <div className={styles['lds-default']}>
      {innerDivArray.map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  )
}

export default Spinner
