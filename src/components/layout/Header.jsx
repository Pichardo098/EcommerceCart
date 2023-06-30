import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { changeIsShowCart } from "../../store/slices/cart.slice"

const Header = () => {

  const {products} = useSelector(store => store.cart)
  const dispatch = useDispatch()
  const totalProducts = products.reduce((acc,curr )=> acc + (curr.quantity ) , 0)

  
  const handleClickShowCart = () => {
    dispatch(changeIsShowCart())
  }

  return (
    <header className="grid grid-cols-2 z-30 bg-white text-center text-xl font-bold ">

      <Link to="/" className="text-center border-2 py-2 text-red-600">E-commerce</Link> 

      <nav className="grid grid-cols-3 ">
        <Link to="/login" className="border-2 hover:bg-gray-300 hover:text-white py-2"><i className='bx bx-user '></i></Link>
        <Link to="/purchases" className="border-2 hover:bg-gray-300 hover:text-white py-2"><i className='bx bx-box '></i></Link>
        <button onClick={handleClickShowCart} className=" border-2 hover:bg-gray-300 hover:text-white text-2xl font-bold">
          <i className='bx bx-cart relative'>
            <div className="absolute bg-red-500 h-[25px] rounded-full aspect-square -top-3 -right-5">
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-[14px] ">
              {totalProducts}
              </div>
            </div>

          </i>
        </button>
      </nav>
    </header>
  )
}

export default Header