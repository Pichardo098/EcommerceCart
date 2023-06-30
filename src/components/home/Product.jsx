import { useEffect } from "react"
import { Link } from "react-router-dom"
import { axiosEcommerce, getConfig } from "../../utils/configureAxios"
import { addProductCart, getProductsCart, updateCart } from "../../store/slices/cart.slice"
import { useDispatch, useSelector } from "react-redux"
import Load from "../layout/Load"

const Product = ({product}) => {
  

  const dispatch = useDispatch()
  const {products} = useSelector(store => store.cart)

  
  const handleClickAddProduct = (e) => {
    e.preventDefault()
    for(let i = 0; i < products.length; i++){
      if(products[i].productId === product.id){
        const productToUpdate = {
          quantity: 1 + products[i].quantity
        }
        return dispatch(updateCart(products[i].id,productToUpdate)) 
      }
    }
    const productToAdd = {
      quantity: 1,
      productId: product.id
    }
    return dispatch(addProductCart(productToAdd))
  }

  
  useEffect(() => {
    dispatch(getProductsCart())
  
  }, [])
  

  

  return (
    
    <article  className="bg-white text-black flex flex-col justify-between items-center gap-2 rounded-lg border-2 border-gray-300 ">
      {
      product.images[0] ? 
      <Link to={`/products/${product.id}`} className="h-[200px] px-5 my-10 overflow-hidden relative group   ">
        <img className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-700 " src={product.images[0].url} alt={product.title} />
        <img className="absolute left-0 top-0 w-full h-full object-contain p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 " src={product.images[1].url} alt={product.title} />
      </Link>
      :
      <Load/>
      }
      <hr className="h-[1px] border-none bg-gray-400 w-full" />
      <section className="flex flex-col  text-start w-full px-5 relative h-[220px]  justify-start gap-5 py-5 text-xl ">
        <section >
          <h5 className="font-bold text-gray-300">{product.brand}</h5>
          <h5 className="pl-2 font-semibold text-[15px]">{product.title}</h5>
        </section>
        <section className="flex flex-col">
          <span className="font-medium text-gray-300">Price</span>
          <span className="pl-2 font-semibold text-[15px]">${product.price}</span>
        </section>

        <button onClick={handleClickAddProduct} className="absolute right-4 text-white font-bold text-[20px] bottom-5 bg-red-500 py-2 px-3 rounded-full"><i className='bx bx-cart'></i></button>
      </section>
    </article>
  )
}

export default Product