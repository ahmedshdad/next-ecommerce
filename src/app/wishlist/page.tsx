"use client"

import { getWishList } from "@/Api/wishlist.api"
import { ProductType } from "@/type/products.type"
import React, { useEffect, useState } from "react"
import WishListItem from "../myWishList/wishListItem"

export default function Page() {
  const [loading, setLoading] = useState(true)  
  const [allProducts, setAllProducts] = useState<ProductType[]>([])  

 
  async function handleGetWishList() {
    const data = await getWishList()
    setAllProducts(data.data)
    setLoading(false)
  }

   
  useEffect(() => {
    handleGetWishList()
  }, [])

   
  function handleRemoveFromState(id: string) {
    setAllProducts((prev) => prev.filter((p) => p._id !== id))
  }

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <i className="text-green-500 fa-3x fa-solid fa-spinner fa-spin-pulse"></i>
      </div>
    )
  }

 
  return (
    <div className="p-8 m-8">
      <h2 className="text-green-500 text-3xl font-semibold text-center mb-6">
        WishList
      </h2>

      {allProducts.length === 0 ? (
        <div className="flex justify-center items-center">
          <h2 className="text-gray-500 text-lg"> Your WishList is Empty  </h2>
            
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <WishListItem key={product._id}   product={product} onRemove={handleRemoveFromState}/>
           
          ))}
        </div>
      )}
    </div>
  )
}
