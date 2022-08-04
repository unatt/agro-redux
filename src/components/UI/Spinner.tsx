import React from 'react'
import styles from './Spinner.module.scss'

const Spinner = () => {
  const innerDivArray = new Array(12).fill(<div></div>)
  return <div className={styles['lds-default']}>{innerDivArray}</div>
}

export default Spinner
