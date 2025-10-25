'use client'

import { clearCart } from "@/Api/cart.api"
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import CartItem from "./CartItem";
import { toast } from "sonner";
import Link from "next/link";
import { cartContext } from "../context/cart.context";
import { CartType } from "@/type/cart.type";

export default function Cart() {
  const context = useContext(cartContext)
  const [loading, setLoading] = useState(true)
  const [isData, setIsData] = useState<CartType | undefined>(undefined)

  async function handleGetProductFromCart() {
    const data = await context?.handleCart()
    setLoading(false)
    setIsData(data)
  }

  async function handleClearcart() {
    await clearCart()
    context?.setAllProducts([])
    toast.success('Cart Cleared Successfully')
    context?.handleCart()
  }

  useEffect(() => {
    handleGetProductFromCart()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen '>
        <i className="text-green-500 fa-3x fa-solid fa-spinner fa-spin-pulse"></i>
      </div>
    )
  }

  return (
    <>
      <title>Cart</title>

      <div className="bg-slate-100 p-6 sm:p-10 my-6 rounded-xl shadow-md max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
            <ShoppingCart className="text-green-500" /> Shop Cart
          </h2>

          {context?.allProducts?.length !== 0 && (
            <button
              onClick={handleClearcart}
              className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-md text-lg"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Total Price */}
        <h3 className="text-green-600 font-semibold text-lg border-b pb-2 mb-4">
          Total Cart Price: {context?.totalPrice} EGP
        </h3>

        {/* Cart Content */}
        {context?.allProducts?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 py-10">
            <h2 className="text-gray-600 text-xl">Your Cart is Empty</h2>
            <Link href="/Products">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-2 rounded-md">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="grid gap-4">
              {context?.allProducts?.map((product) => (
                <CartItem key={product.product.id} product={product} />
              ))}
            </div>

            {/* Checkout Button */}
            <Link href={`/checkout/${isData?.cartId}`} className="block">
              <button className="w-full mt-6 py-3 text-lg font-semibold rounded-md bg-green-500 hover:bg-green-600 transition text-white">
                Checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}