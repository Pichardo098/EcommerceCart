import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosEcommerce, getConfig } from "../utils/configureAxios"
import Purchase from "../components/purchases/Purchase"

const Purchases = () => {

  const [purchasesHistory, setPurchasesHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)



  const paginationLogic = () => {
    const PURCHASES_PER_PAGE = 10

    //PURCHASES que se van a mostrar en la pagina actual

    const sliceStart = (currentPage - 1) * PURCHASES_PER_PAGE
    const sliceEnd = sliceStart + PURCHASES_PER_PAGE
    const purchasesInPage = purchasesHistory.slice(sliceStart, sliceEnd )

    //Ultima Página
    const lastPage = Math.ceil(purchasesHistory.length / PURCHASES_PER_PAGE ) || 1

    //Bloque actual
    const PAGES_PER_BLOCK = 3
    const actualBlockk =  Math.ceil(currentPage/PAGES_PER_BLOCK) 
    
    //Paginas que se vana  mostrar en el bloque actual
    const  pagesInBlock = []
    const minPage = (actualBlockk - 1 ) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlockk * PAGES_PER_BLOCK
    for(let i = minPage ; i <= maxPage; i++){
      if(i <= lastPage)
      pagesInBlock.push(i)
    }

    return {
      purchasesInPage,
      lastPage,
      pagesInBlock
    }
  }

  const {purchasesInPage, lastPage, pagesInBlock} = paginationLogic()

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  const actualPage = (currentPage, numberPage) => {
    if(currentPage == numberPage)
      return "blur(0)"
    
  }

  const hasPurchases  = purchasesInPage.length > 0
  
  useEffect(() => {
    axiosEcommerce.get("/purchases", getConfig())
      .then(({data})=> {
        const orderPurchases = data.sort((a, b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setPurchasesHistory(orderPurchases)
      })
      .catch((err)=> console.log(err))
  },[])

  
  return (
    <section className="max-w-[1200px] mx-auto">
      <section className="flex items-center text-center gap-3 text-black m-6 md:text-[20px]">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square bg-red-500 rounded-full"></div>
        <span className="font-bold ">Purchases</span>
      </section>

      <h3 className="m-6 text-black">My purchases</h3>
      <section className="p-2 grid gap-2">
        {
          purchasesInPage.map((purchase)=> (
            <Purchase key={purchase.id} purchase={purchase}/>
          ))
        }

        {/* Paginación */}
        {
          hasPurchases &&
          
        <ul className="flex justify-around my-6 ">
          
          <li onClick={()=>setCurrentPage(1)} className={`bg-btn_red ${currentPage == 1 ? "hidden":"visible"} py-1 px-2 sm:py-2 sm:px-4 sm:text-lg text-bkg_white rounded-md font-bold text-[10px] shadow-lg shadow-gray-500  cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{"<<"}</li>
          <li onClick={handleClickPreviousPage} className={`bg-btn_red ${currentPage == 1 ? "hidden":"visible"} py-1 px-2 sm:py-2 sm:px-4 sm:text-lg text-bkg_white rounded-md font-bold text-[10px] shadow-lg shadow-gray-500  cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{"<"}</li>
          {
            pagesInBlock.map(numberPage => (
              <li style={{filter: actualPage(currentPage,numberPage)}} className={`bg-btn_red py-1 px-2 sm:py-2 sm:px-4 sm:text-lg blur-sm hover:blur-none text-bkg_white rounded-md font-bold text-[10px] shadow-lg shadow-gray-500  cursor-pointer  hover:scale-125  ` } onClick={()=> setCurrentPage(numberPage)} key={numberPage}>{numberPage}</li>
            ))
          }
          <li onClick={handleClickNextPage} className={`bg-btn_red ${currentPage == lastPage ? "hidden":"visible"} py-1 px-2 s:py-2 sm:px-4 sm:text-lg text-bkg_white rounded-md font-bold text-[10px] shadow-lg shadow-gray-500  cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{">"}</li>
          <li onClick={()=>setCurrentPage(lastPage)} className={`bg-btn_red ${currentPage == lastPage ? "hidden":"visible"} py-1 px-2 sm:py-2 sm:px-4 sm:text-lg text-bkg_white rounded-md font-bold text-[10px] shadow-lg shadow-gray-500  cursor-pointer hover:bg-btn_hover hover:scale-125  `}>{">>"}</li>

        </ul>
        }

      </section>
    </section>
  )
}

export default Purchases