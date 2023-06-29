import Product from "./Product"

const ListProducts = ({products}) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,280px)] lg:grid-rows-[repeat(auto-fill,550px)] justify-center mx-auto gap-4 lg:w-full">
      {
        products.map(product => (
          <Product key={product.id} product={product}/>
        ))
      }
    </section>
  )
}

export default ListProducts