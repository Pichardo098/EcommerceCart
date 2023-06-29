import { Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetail from "./pages/ProductDetail"
import Purchases from "./pages/Purchases"
import ProtectedRoutes from "./components/auth/ProtectedRoutes"
import Footer from "./components/layout/Footer"
import Cart from "./components/cart/Cart"
import Signup from "./pages/Signup"

function App() {

  return (
    <div id='body' className='grid grid-rows-[auto_1fr] min-h-screen bg-white text-gray-400 '>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/products/:id" element={<ProductDetail/>}></Route>
        <Route path="/signup" element= {<Signup/>}></Route>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases/>}></Route>
        </Route>

      </Routes>
      <Cart/>
      <Footer/>
      
    </div>
  )
}

export default App
