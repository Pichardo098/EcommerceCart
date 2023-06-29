const Footer = () => {
  return (
    <footer className="bg-gray-700 h-[200px] flex justify-start items-center text-xl text-white md:justify-center md:text-center">
      <section className="pl-3 grid gap-6 md:pl-0 ">
        <h2 className=" font-bold ">Academlo</h2>
        <ul className="flex md:justify-center gap-4 text-2xl">
          <li className="hover:scale-125 transition-all hover:text-black"><a href="#"><i className='bx bxl-github'></i></a></li>
          <li className="hover:scale-125 transition-all hover:text-blue-700"><a href="#"><i className='bx bxl-linkedin-square'></i></a></li>
          <li className="hover:scale-125 transition-all hover:text-pink-500"><a href="#"><i className='bx bxl-instagram-alt'></i></a></li>
        </ul>
        <p>Created by Jesús Pichardo.</p>
      </section>
    </footer>
  )
}

export default Footer