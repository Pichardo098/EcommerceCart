import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { axiosEcommerce, getConfig } from "../utils/configureAxios"
import ListProducts from "../components/home/ListProducts"
import { useDispatch, useSelector } from "react-redux"
import { addProductCart, getProductsCart, updateCart } from "../store/slices/cart.slice"

const stylesImages = {
  0 :"-ml-[0%]",
  1 : "-ml-[100%]",
  2 :"-ml-[200%]",
}

const ProductDetail = () => {

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [imageToShow, setImageToShow] = useState(0)
  const {products} = useSelector(store => store.cart)
  const dispatch = useDispatch()


  const {id} = useParams()

  const handleClickPlus = () => {setQuantity(quantity+1)}
  const handleClickMinus = () => {
    if(quantity > 1){
      setQuantity(quantity - 1)
    }
  }

  const handleClickNextImage = () => {
    if(imageToShow < 2){
      setImageToShow(imageToShow + 1)
    }else if(imageToShow == 2){
      setImageToShow(0)
    }
  }
  const handleClickPreviousImage = () => {
    if(imageToShow > 0){
      setImageToShow(imageToShow - 1)
    }else if(imageToShow == 0){
      setImageToShow(2)
    }
  }

  const handleClickViewImg =  (imgCurrentClick) => {
    for(let i = 0; i < product.images.length; i++){
      if(product.images[i].id == imgCurrentClick.id){
        setImageToShow(i)
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
        
      

      
      // if(products[i].productId === product?.id){
      //   const productToUpdate = {
      //     quantity,
      //   }
      //   return dispatch(updateCart(product?.id,productToUpdate))
      // }else{
      //   const productToAdd = {
      //     quantity,
      //     productId: product.id
      //   }
    
      //   return dispatch(addProductCart(productToAdd))
        
      

  }


  


  useEffect(()=> {
    dispatch(getProductsCart())
    axiosEcommerce.get(`/products/${id}`)
      .then(({data}) => setProduct(data))
      .catch((err) => console.log(err))
  },[id])

  useEffect(()=>{
    if(product){
      axiosEcommerce.get(`/products?categoryId=${product.categoryId}`)
        .then(({data}) => {
          const productsFilter = data.filter((item) => item.id !== product.id)
          setSimilarProducts(productsFilter)
        })
        .catch(() => console.log())
    }

  },[product])


  return (
    <div>
      <main className="max-w-[1200px] mx-auto">
        <section className="flex items-center text-center gap-3 text-black m-6 md:text-[20px]">
          <Link to="/">Home</Link>
          <div className="h-[6px] aspect-square bg-red-500 rounded-full"></div>
          <span className="font-bold ">{product?.title  }</span>
        </section>

        {/* Contenedor del producto */}
        <section className=" p-2 sm:p-5 mx-auto grid items-center  gap-6 sm:grid-cols-2 md:text-[20px]">
          
          {/* Contenedor Imagenes */}
          <article className="overflow-hidden relative ">
            <section className={`flex  w-[300%] ${stylesImages[imageToShow]} transition-all `}>
              <div className="h-[250px] sm:h-[300px] px-[5%] w-[calc(100%_/_3)] ">
                <img className="w-full h-full object-contain " src={product?.images[0].url} alt={product?. title} />
              </div>
              <div className="h-[250px] sm:h-[300px] px-[5%] w-[calc(100%_/_3)] ">
                <img className="w-full h-full object-contain" src={product?.images[1].url} alt={product?. title} />
              </div>

              <div className="h-[250px] sm:h-[300px] px-[5%] w-[calc(100%_/_3)] ">
                <img className="w-full h-full object-contain" src={product?.images[2].url} alt={product?. title} />
              </div>
            </section>

            
            <button onClick={handleClickPreviousImage} className="absolute top-[35%] left-2  -translate-y-1/2 bg-red-500 h-10 text-white text-[25px] hover:bg-red-400 aspect-square rounded-full my-auto "><i className='bx bx-chevron-left'></i></button> 
            <button onClick={handleClickNextImage} className="absolute top-[35%] right-2 -translate-y-1/2 bg-red-500 h-10 text-white text-[25px] hover:bg-red-400 aspect-square rounded-full my-auto "><i className='bx bx-chevron-right'></i></button>
            
            <section className={`relative flex justify-center gap-10 h-[80px]  mt-5 transition-all`}>
              {
                product?.images.map((image)=> (
                  <button onClick={() => handleClickViewImg(image)} key={image.id} className="h-full ">
                    <img className={`w-full h-full border-2 p-2 object-contain ${product.images[imageToShow].id == image.id ? "border-red-400" : "border-gray-200"} `} src={image.url} alt={product?. title} />
                  </button>
                ))
              }
              
            </section>
          </article>



          {/* Contenedor Descripción */}
          <article className="flex flex-col gap-7">
            <h4 className="text-[15px]">{product?.brand}</h4>
            <span className="font-bold block pl-3 text-black">{product?.title}</span>
            <section className="grid grid-cols-2">
              <article>
                <h4 className="text-[15px]">Price</h4>
                <span className="font-semibold block pl-3 text-black">${product?.price}</span>
              </article>
              <article className="flex flex-col justify-center text-center items-center">
                <h5>Quantity</h5>
                <div className="flex justify-center  max-w-max">
                  <button className="p-1 border-2 px-3 text-black font-semibold hover:bg-gray-200" onClick={handleClickMinus}>-</button>
                  <span className="p-1 border-2 px-4 text-black font-semibold">{quantity}</span>
                  <button className="p-1 border-2 px-3 text-black font-semibold hover:bg-gray-200" onClick={handleClickPlus}>+</button>
                </div>
              </article>
            </section>

            <button onClick={handleClickAddProduct}  className="bg-red-500 text-white py-2 hover:bg-red-400"> Add to cart <i className="bx bx-cart"></i></button>

            <p className="text-[15] text-black md:text-[18px] p-2">{product?.description}</p>
          </article>
        </section>

        {/* Productos Similares */}
        <section className="p-2 grid text-xl gap-6">
          <h2 className="text-red-500 font-bold">Discover similar items</h2>
          <section className="">
            <ListProducts products={similarProducts} />
          </section>
        </section>
      </main>
    </div>
  )
}

export default ProductDetail