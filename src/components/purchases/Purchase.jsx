import { formatDDMMYYYY } from "../../utils/date"

const Purchase = ({purchase}) => {

  const totalPrice = (purchase?.product.price * purchase?.quantity).toFixed(2)

  return (
    <article className="grid grid-cols-2 border-2 gap-4 text-sm items-center justify-center text-center md:text-xl ">
      {/* Sección izq */}
      <section className="flex flex-row items-center justify-center text-center pl-3 py-2 gap-1">
        <div className="h-[100px] lg:h-[200px]">
          <img className="h-full lg:px-[5%] mx-auto object-contain" src={purchase?.product.images[2].url} alt={purchase?.product.title} />
        </div>
        <h4 className="lg:w-[250px]">{purchase?.product.title}</h4>
      </section>

      {/* Sección derecha */}
      <section className="flex flex-col md:flex-row gap-3 justify-center md:justify-around items-center">
        <span>{formatDDMMYYYY(purchase?.createdAt)}</span>
        <span className="w-auto px-3 py-1 border-2">Qty: {purchase?.quantity}</span>
        <span>${totalPrice}</span>
      </section>
      
    </article>
  )
}

export default Purchase