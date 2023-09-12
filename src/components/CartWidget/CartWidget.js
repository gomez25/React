import React from 'react'
import cart from './assets/cart.png'

export default function CartWidget({count}) {
  return (
    <div>
      <img src={cart}/>{count}
    </div>
  )
}
