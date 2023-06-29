import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductCart, updateCart } from '../../store/slices/cart.slice'

const CartProduct = ({cartProduct}) => {
  const {products} = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const totalPrice = (cartProduct.product.price * cartProduct.quantity).toFixed(2)

  const handleClickDelete = () => {
    dispatch(deleteProductCart(cartProduct.id))
  }

  const handleClickPlusItem = () => {
    for(let i = 0; i < products.length; i++){
      if(products[i].id === cartProduct.id){
        const productToUpdate = {
        quantity: 1 + products[i].quantity
        } 
      return dispatch(updateCart(products[i].id,productToUpdate))
      }
    }
  }

  const handleClickLessItem = () => {    
    for(let i = 0; i < products.length; i++){
      if(products[i].id === cartProduct.id){
        if(products[i].quantity == 1){
          return dispatch(deleteProductCart(cartProduct.id))
        }
        const productToUpdate = {
        quantity: products[i].quantity - 1
        } 
      return dispatch(updateCart(products[i].id,productToUpdate))
      }
    }
  }


  const handleClickAddProduct = () => {
    for(let i = 0; i < products.length; i++){
      if(products[i].productId === product.id){
        const productToUpdate = {
        quantity: quantity + products[i].quantity
        } 
      return dispatch(updateCart(products[i].id,productToUpdate)) ,setQuantity(1)
      }
    }
    const productToAdd = {
      quantity,
    productId: product.id
    }
    
    return dispatch(addProductCart(productToAdd))
  }

  
  return (
    <article className="grid grid-rows-[auto,auto] gap-2">
      <section className="grid grid-cols-[auto,1fr,auto] gap-2 items-center text-center text-[15px]">
        <div className="h-[60px]">
          <img className="h-full object-contain" src={cartProduct.product.images[2].url} alt={cartProduct.product.title} />
        </div>
        <section>
          <h3>{cartProduct.product.title}</h3>
          {/* Botones para aumentar o disminuir la cantidad */}
          <div className="flex justify-center ">
            <button onClick={handleClickLessItem} className="p-1 border-2 px-3 text-black font-semibold hover:bg-gray-200">-</button>
            <span className="p-1 border-2 px-4 text-black font-semibold">{cartProduct.quantity}</span>
            <button onClick={handleClickPlusItem} className="p-1 border-2 px-3 text-black font-semibold hover:bg-gray-200">+</button>
          </div>
        </section>
        <button onClick={handleClickDelete}><i className='bx bxs-trash text-red-500 font-bold text-[20px] hover:text-red-400'></i></button>
      </section>
      <section className="h-auto flex justify-end gap-3 text-black">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </section>
      <hr />
    </article>
  )
}

export default CartProduct