"use client"
 
import React, { useState } from "react"
import Image from "next/image"
import { Trash } from "lucide-react"
import { removeFromWishList } from "@/Api/wishlist.api"
import { toast } from "sonner"
import { ProductType } from "@/type/products.type"

export default function WishListItem({product, onRemove,}: {product: ProductType ,   onRemove: (id: string) => void}){

 
  
  const [isLoading, setIsLoading] = useState(false)

  async function handleRemove() {
    setIsLoading(true)
    try {
      const data = await removeFromWishList(product._id)

      if (data.status === "success") {
        toast.success("Removed from wishlist")
        onRemove(product._id)  
      } else {
        toast.error("Can't remove")
      }
    } catch (error) {
      toast.error("Can't remove")
    } finally {
      setIsLoading(false) 
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center gap-3">
      <Image src={product.imageCover} alt={product.title} width={200}  height={200}  className="rounded-md" />
        
         
      <h3 className="text-lg font-semibold text-center">{product.title}</h3>
      <button disabled={isLoading} onClick={handleRemove}    className=" cursor-pointer flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition disabled:cursor-not-allowed disabled:bg-green-300"
 >
        
        
    
        <Trash className="w-4 h-4" /> {isLoading ? "Removing..." : "Remove"}
      </button>
    </div>
  )
}
