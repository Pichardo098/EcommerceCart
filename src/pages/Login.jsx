import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, logout } from "../store/slices/userInfo.slice"
import { Link } from "react-router-dom"


const Login = () => {

  const {register, handleSubmit, reset} = useForm()
  const dispatch = useDispatch()
  const {token, user} = useSelector((store) => store.userInfo)
  
  
  const submit = (dataForm) => {
    dispatch(loginUser(dataForm))
  }

  
  const handleLogOut = () => {
    dispatch(logout())
  }

  

  return (
    <section className="  bg-gray-200 text-black flex justify-center items-center ">

      {
        token ? 
        <section className="p-5 mx-2 bg-white rounded-lg max-w-[350px] w-[280px]  flex flex-col gap-6 justify-center items-center">
          <div className="rounded-full">
            <img className=" rounded-full h-[150px] aspect-square" src="/images/imgUser.png" alt="User Image" />
          </div>
          <h1 className="uppercase font-bold">{user.firstName} {user.lastName}</h1>
          <button onClick={handleLogOut} className="bg-red-600 py-2 w-full rounded-md text-white hover:bg-red-300">
            Log Out
          </button>
        </section> 
        :
      <form onSubmit={handleSubmit(submit)} className="p-5 mx-2 bg-white rounded-lg max-w-[350px] flex flex-col gap-6 mt-8">
        <h3 className="font-bold text-2xl mt-2">Welcome! Enter your email and password to continue</h3>

        <section className="bg-cyan-100 p-3 rounded-lg my-4">
          <h5 className="text-center font-bold mb-2">Test Data</h5>
          <div className="flex items-center gap-2">
          <i className='bx bxs-envelope text-xl'></i>
          <span>john@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
          <i className='bx bx-lock-alt text-xl'></i>
          <span>john1234</span>
          </div>
        </section>

        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">Email:</label>
          <input required {...register("email")} className="border-2 rounded-md outline-none p-2" type="email" id="email"/>
        </div>
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="password">Password:</label>
          <input required {...register("password")} className="border-2 rounded-md outline-none p-2" type="password" id="password" />
        </div>

        
        <button className="text-white bg-red-600 p-2 mt-3 hover:bg-red-500 transition-colors">
          Login
        </button>

        <p className="text-start py-3">
          Don't have an account? <Link to={"/signup"} className="text-blue-600 underline hover:no-underline">Sign up</Link> 
        </p>
      </form>
      }

    </section>
  )
}

export default Login