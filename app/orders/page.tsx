"use client"
import LastestOrderItem from "@/components/order/LastestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdresPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data,isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
      refreshInterval: 60000,
      revalidateOnFocus: false
    })
   
  
    if (isLoading) return <p>Cargando...</p>
    if (data) return(
        <>
            <h1 className="text-center my-20 text-6xl font-black text-black">Ordenes lista</h1>

            <Logo />

            {data.length ? (
                <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10 text-black">
                    {data.map(order => (
                        <LastestOrderItem key={order.id} order={order}/>
                    ))}
                </div>
            ): <p className=" text-center my-10">No hay ordenes listas</p>}
        </>
    )
}
