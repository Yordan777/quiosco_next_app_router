import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "../utils"
import { useStore } from "@/src/store"
import { useMemo } from "react"

type ProductDetailProps = {
    item: OrderItem
}

const MAX_ITEM = 10
const MIN_ITEM = 1
export default function ProductDetail({ item }: ProductDetailProps) {

    const increaseQuatity = useStore(state => state.increaseQuatity)
    const decreaseQuatity = useStore(state => state.decreaseQuatity)
    const removeItem = useStore(state => state.removeItem)

    const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEM , [item])
    const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEM , [item])


    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        onClick={() => decreaseQuatity(item.id)}
                        disabled={disableDecreaseButton}
                        className=" disabled:opacity-20"
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => increaseQuatity(item.id)}
                        disabled={disableIncreaseButton}
                        className=" disabled:opacity-20"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(item.subTotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}
