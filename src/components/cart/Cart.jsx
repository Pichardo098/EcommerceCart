import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeIsShowCart, checkoutCart, getProductsCart } from "../../store/slices/cart.slice"
import CartProduct from "./CartProduct"
import {  useNavigate } from "react-router-dom"
import ModalPurchaseCreate from "./ModalPurchaseCreate"


const Cart = () => {

  const {isShowCart,products} = useSelector((store) => store.cart)
  const {token} = useSelector((store)=> store.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModalPurchase, setShowModalPurchase] = useState(false)
  
  

  useEffect(() => {
    if(token && isShowCart ){
      dispatch(getProductsCart())
    }
  },[isShowCart])


  const handleClickCloseCart = () => {
    dispatch(changeIsShowCart())
  }

  const totalPriceCheckout = products.reduce((acc, curr)=> acc + (curr.product.price * curr.quantity) , 0)


  const handleClickCheckout = () => {
    setShowModalPurchase(!showModalPurchase)
    navigate("/purchases")
    dispatch(checkoutCart())
  }
  
  return (
    <section className={`fixed  bottom-0 right-0 w-[300px] top-[48px] lg:top-0 transition-all overflow-hidden ${isShowCart && token ? "translate-x-0" : "translate-x-full"}  shadow-lg shadow-gray-500`}>
      <section className=" p-6 pt-[48px] absolute flex flex-col h-full w-full justify-between bg-white shadow-lg shadow-gray-300  ">
        <button onClick={handleClickCloseCart} className="absolute top-2 right-3 font-bold text-red-500 bg-gray-200 py-1 px-3 rounded-full hover:bg-gray-100 hover:text-red-400">
          X
        </button>
        <h2 className="text-black font-semibold text-xl">Shopping Cart</h2>


        {/* Productos del carrito */}
        <section className="h-full py-2 flex flex-col gap-3 overflow-scroll ">
          {
            products?.map(cartProduct => (
              <CartProduct cartProduct={cartProduct}  key={cartProduct.id} />
            ))
          }
        </section>


        {/* Sección precio total */}
        <section className=" flex flex-col justify-between gap-7">
          <hr />
          <div className="flex justify-between">
            <span>Total: </span>
            <span className="text-black font-bold">${(totalPriceCheckout).toFixed(2)}</span>
          </div>
          <button onClick={handleClickCheckout} className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400">Checkout</button>

        </section>
      </section>
      <ModalPurchaseCreate setShowModalPurchase={setShowModalPurchase} showModalPurchase={showModalPurchase} />
    </section>
  )
}

export default Cart