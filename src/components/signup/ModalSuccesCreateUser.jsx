import React from 'react'

const ModalSuccesCreateUser = ({setIsShowModalCreate,isShowModalCreate}) => {

  const handleClickCloseModal = ()  => {
    setIsShowModalCreate(!isShowModalCreate)
  }

  return (
    <section className={`fixed bottom-0 w-full left-0 bg-black/60 min-h-screen z-40 flex items-center justify-center ${isShowModalCreate?"visible":"invisible"} `}>
      <section className="text-black w-[300px] bg-white h-[250px] text-xl flex flex-col justify-around items-center rounded-lg text-center">
      Registered user successfully

        <button onClick={handleClickCloseModal} className="bg-red-500 w-[80%] text-white rounded-md shadow-lg hover:bg-red-300">Accept</button>
      </section>
    </section>
  )
}

export default ModalSuccesCreateUser