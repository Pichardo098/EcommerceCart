import { useState } from "react"

const Filters = ({handleClickCategory,categories,showToFilters,setShowToFilters,handleSubmitFilters}) => {

  const [showPrice, setShowPrice] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  const handleClickCloseFilters = () => {
    setShowToFilters(!showToFilters)
  }

  const showFilterPrice = () => {
    setShowPrice(!showPrice)
  }

  const showFilterCategory = () => {
    setShowCategory(!showCategory)
  }

  


  
  return (
    <section className={`fixed w-[300px] right-0 bg-white min-h-screen bottom-0 z-40 transition-all ${showToFilters ? "translate-x-0": "translate-x-full"} shadow-lg lg:translate-x-0 lg:left-0  lg:shadow-none lg:bg-gray-200 lg:relative lg:min-h-full`}>
      <section className='flex absolute flex-col gap-4 mt-[48px] px-[20px] w-full '>
        <h2 className="font-bold text-black flex items-center ">Filters</h2>
        {/* Filtro por precio */}
        <section>
          <button onClick={showFilterPrice} className="font-bold text-black flex items-center w-full justify-between px-2  gap-4 ">Price <i className={`bx bxs-chevron-down ${showPrice ? "rotate-180" : "rotate-0"} transition-all`}></i></button>
          <hr className="bg-black h-[1px] border-none my-1"/>
          <form onSubmit={handleSubmitFilters}  className={`flex flex-col px-2 gap-3 pt-4 overflow-hidden lg:text-black  ${showPrice ? "max-h-[1000px]" : "max-h-[0px]"} transition-all duration-1000`}>
            <div className="grid">
              <label htmlFor="from ">From</label>
              <input type="number" id="from" className=" border-2 px-2 py-1 rounded-md w-[70%] outline-none"/>
            </div>
            <div className="grid">
              <label htmlFor="to">To</label>
              <input type="number" id="to" className=" border-2 px-2 py-1 rounded-md w-[70%] outline-none"/>
            </div>
            <button  className="bg-red-500 px-2 py-1 rounded-md text-white font-medium w-[50%] self-end">Filter price</button>
          </form>
          
        </section>
        {/* Filtro por categoría */}
        <section >
          <button onClick={showFilterCategory} className="font-bold text-black  flex items-center w-full justify-between px-2  gap-4 ">Category <i className={`bx bxs-chevron-down ${showCategory ? "rotate-180" : "rotate-0"} transition-all`}></i></button>
          <hr className="bg-black h-[1px] border-none my-1"/>
          <section className={`overflow-hidden  ${showCategory ? "max-h-[1000px]" : "max-h-[0px]"} pl-2 pt-4 transition-all duration-1000`}>
            <ul className="flex flex-col gap-2 lg:text-black" >
            <li onClick={handleClickCategory} data-category={''} className="cursor-pointer">All categories</li>
            {
              categories.map((category)=> (
                <li onClick={handleClickCategory} data-category={category.id} key={category.id} className="cursor-pointer">{category.name}</li>
              ))
            }
            </ul>
          </section>
        </section>

      </section>
      <button onClick={handleClickCloseFilters} className="absolute top-2 right-3 font-bold text-red-500 bg-gray-200 py-1 px-3 rounded-full hover:bg-gray-100 hover:text-red-400 lg:invisible">X</button>
    </section>
  )
}

export default Filters