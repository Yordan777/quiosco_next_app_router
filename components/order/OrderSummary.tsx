"use client"

import { useStore } from "@/src/store"
import ProductDetail from "./ProductDetail"
import { useMemo } from "react"
import { formatCurrency } from "../utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore(state => state.order)
  const clearOrder = useStore(state => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formDate: FormData) => {
    const data = {
      name: formDate.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data) 
    if (!result.success) {
      result.error.issues.forEach((issues) => toast.error(issues.message))
      return
    }


    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issues) => toast.error(issues.message))
      return
    }

    toast.success('Pedido Realizado Correctamente')
    clearOrder()

  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black"> Mis Pedidos</h1>

      {order.length === 0 ? <p className=" text-center mt-10">El pedido esta vacio</p> : (
        <div className=" mt-5">
          {order.map(item => (
            <ProductDetail
              key={item.id}
              item={item}
            />
          ))}

          <p className=" text-2xl mt-20 text-center"></p>
          Total a pagar: {' '}
          <span className=" font-bold">{formatCurrency(total)}</span>

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input
              type="text"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />
            <input
              type="submit"
              className=" py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="confirmar pedido"
            />
          </form>
        </div>

      )}
    </aside>
  )
}