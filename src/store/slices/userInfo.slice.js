import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configureAxios";
import { Navigate } from "react-router-dom";

const initialState = {
  token: "",
  user: null,
}

const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("userInfo")) ?? initialState,
  name: "userInfo",
  reducers: {
    setUserInfo: (state,action) => {
      const responseLogin = action.payload
      //Spread Operator ...{}
      const newState = {...state, ...responseLogin}
      localStorage.setItem("userInfo", JSON.stringify(newState))
      return newState
    },
    logout: (state) => {
      const newState = {
        ...state,...initialState
      }
      localStorage.setItem("userInfo", JSON.stringify(newState))
      return newState
    },


  }
})


export const {setUserInfo,logout} = userInfoSlice.actions 

export const loginUser = (  dataForm) => (dispatch) => {
  axiosEcommerce.post("/users/login", dataForm)
    .then(({data})=> dispatch(setUserInfo(data)))
    .catch((err)=> window.alert("Credenciales no válidas"))

  
  
}

export const registerUser = ( dataRegister) => (dispatch) => {
  axiosEcommerce.post("/users", dataRegister)
    .then(()=> {
      const dataLogin = {
        email: dataRegister.email,
        password: dataRegister.password
      }
      dispatch(loginUser( dataLogin))
      Navigate("/login")
      window.alert("Cuenta creada con éxito")
    })
    .catch((err)=> window.alert("En este momento no podemos procesar tu solicitud"))

 
}

export default userInfoSlice.reducer