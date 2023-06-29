import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configureAxios";

const initialState = {
  products: [],
  isShowCart: false
}

const cartSlice = createSlice({
  initialState ,
  name:"cartSlice",
  reducers: {
    changeIsShowCart : (state) => {
      state.isShowCart = !state.isShowCart
    },
    setProducts: (state, action) => {
      const newProducts = action.payload
      state.products = newProducts
    }
  }
})

export const {changeIsShowCart,setProducts} = cartSlice.actions

export const getProductsCart = () => (dispatch) => {
  axiosEcommerce.get("/cart",getConfig())
    .then(({data})=> dispatch(setProducts(data)))
    .catch((err)=> console.log(err))
}

export const addProductCart = (data) => (dispatch) => {
  axiosEcommerce.post("/cart", data, getConfig())
    .then(() => dispatch(getProductsCart()))
    .catch((err) => console.log(err))
}

export const deleteProductCart = (productId) => (dispatch) => {
  axiosEcommerce.delete(`/cart/${productId}`, getConfig())
    .then(() => dispatch(getProductsCart()))
    .catch((err) => console.log(err))
}

export const checkoutCart = () => (dispatch) => {
  axiosEcommerce.post(`/purchases`,{}, getConfig())
    .then(() => dispatch(getProductsCart()))
    .catch((err) => console.log(err))
}

export const updateCart = (productId, data) => (dispatch) => {
  axiosEcommerce.put(`/cart/${productId}`,data, getConfig())
    .then(() => dispatch(getProductsCart()))
    .catch((err) => console.log(err))
}

export default cartSlice.reducer