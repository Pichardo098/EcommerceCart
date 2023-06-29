import { useEffect, useState } from "react"
import { axiosEcommerce } from "../utils/configureAxios"
import Product from "../components/home/Product"
import ListProducts from "../components/home/ListProducts"
import Filters from "../components/home/Filters"

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productName, setProductName] = useState("")
  const [currentCategory, setCurrentCategory] = useState('')
  const [showToFilters, setShowToFilters] = useState(false)

  const productsByName = products.filter((product)=> product.title.toLowerCase().includes(productName))

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentProductName = e.target.productName.value
    setProductName(currentProductName.toLowerCase().trim())
  }

  const handleClickCategory = (e) => {
    setCurrentCategory(e.target.dataset.category)
  }

  useEffect(() => {
      axiosEcommerce.get(`/products?categoryId=${currentCategory}`)
        .then(({data}) => setProducts(data))
        .catch(() => console.log())
  },[currentCategory])

  useEffect(() => {
    axiosEcommerce.get("/categories")
      .then(({data})=> setCategories(data))
      .catch((err)=> console.log(err))
  }, [])

  //Mostrar filtros
  const handleClickShowFilters = () => {
    setShowToFilters(!showToFilters)
  }

  const handleSubmitFilters = (e) => {
    e.preventDefault()
    const from = e.target.from.value
    const to = e.target.to.value
    

    const filterPrice = productsByName.filter((product)=>{
      if(to == "" && from == ""){
        axiosEcommerce.get(`/products?categoryId=${currentCategory}`)
        .then(({data}) => setProducts(data))
        .catch(() => console.log())
      }else if(to == ""){
        return +product.price >= from 
      }else if(from == ""){
        return +product.price <= to 
      }else{
        return +product.price <= to && +product.price >= from
      }

    })
    setProducts(filterPrice)
  }

  
  
  return (
    <main className="bg-gray-200 p-5">
      <form onSubmit={handleSubmit} className=" max-w-[1200px] mx-auto flex flex-col justify-center gap-4 items-center mt-4 " >
        <div className="flex lg:w-1/2  lg:grid lg:grid-cols-[1fr,auto] ">
          <input id="productName" type="text" placeholder="What are you looking for?" className="py-2 pr-5 pl-2 rounded-l-md outline-none" />
          <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-r-md"><i className='bx bx-search'></i></button>
        </div>
        <button onClick={handleClickShowFilters} className="flex items-center gap-3 justify-end mb-4 lg:invisible"><i className='bx bx-filter-alt'></i>Filters</button>
      </form>

      <section className=" max-w-[1200px] mx-auto lg:max-w-full lg:grid lg:grid-cols-[auto,1fr] lg:my-6">
      {/* Filtros */}
      <Filters handleClickCategory={handleClickCategory} categories={categories}  showToFilters={showToFilters}  setShowToFilters={setShowToFilters}  handleSubmitFilters={handleSubmitFilters}/>
      {/* Products */}
      <ListProducts products={productsByName}/>
      </section>
    </main>
  )
}

export default Home