'use client'
import addToCart from '@/Api/cart.api'
import { cartContext } from '@/app/context/cart.context';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';



export default function MyButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(cartContext)
const router = useRouter()

  async function handleAddToCart() {

    try {
      setIsLoading(true)
      const data = await addToCart(id)

      console.log(data);
      if (data.status == 'success') {
        toast.success(data.message, { duration: 2000 })
          context?.handleCart()
      }

    } catch (error:any) {
      
      toast.error( error?.message)
      
      router.push('/login')
    } finally {
      setIsLoading(false)
    }

  }


  return <>



    <button disabled={isLoading} onClick={handleAddToCart} className='bg-green-600 disabled:bg-green-200 text-white rounded-md p-1 cursor-pointer disabled:cursor-not-allowed'>Add To Cart</button>


  </>
}

