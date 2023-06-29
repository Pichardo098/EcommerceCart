import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/slices/userInfo.slice'

const Signup = () => {

  const {register, handleSubmit, reset} = useForm()
  const dispatch = useDispatch()

  const submit = (dataRegisterUser) => {
    dispatch(registerUser(dataRegisterUser))
  }

  return (
    <section className="  bg-gray-200 text-black flex justify-center items-center ">
      <form onSubmit={handleSubmit(submit)} className="p-5 mx-2 bg-white rounded-lg w-[350px] flex flex-col gap-6 my-8">
        <h3 className="font-bold text-2xl mt-2">Sign Up</h3>

        {/* First Name */}
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">First Name:</label>
          <input required {...register("firstName")} className="border-2 rounded-md outline-none p-2" type="text" id="firstName"/>
        </div>
        {/* Last Name */}
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">Last Name:</label>
          <input required {...register("lastName")} className="border-2 rounded-md outline-none p-2" type="text" id="lastName"/>
        </div>
        {/* Email */}
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">Email:</label>
          <input required {...register("email")} className="border-2 rounded-md outline-none p-2" type="email" id="email"/>
        </div>
        {/* Password */}
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">Password:</label>
          <input required {...register("password")} className="border-2 rounded-md outline-none p-2" type="password" id="password"/>
        </div>
        {/* Phone */}
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="password">Phone:  (10 characters)</label>
          <input required {...register("phone", { maxLength: 10})} className="border-2 rounded-md outline-none p-2" type="number" id="phone" />
        </div>

        
        <button className="text-white bg-red-600 p-2 mt-3 hover:bg-red-500 transition-colors">
          Sign up
        </button>

        <p className="text-start py-3">
          Already have an account? <Link to="/login" className="text-blue-600 underline hover:no-underline">Log in</Link> 
        </p>
      </form>
    </section>
  )
}

export default Signup