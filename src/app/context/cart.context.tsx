'use client'
 
import { getProductFromCart } from '@/Api/cart.api'
import { ProductType } from '@/type/products.type'
import { createContext, useEffect, useState, ReactNode } from 'react'

 
export interface CartProduct {
  _id: string
  title: string
  price: number
  count: number
  imageCover?: string
  product : ProductType
}

 
interface CartContextType {
  numOfCartItems: number | null
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>
  allProducts: CartProduct[]
  setAllProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
  totalPrice: number
  handleCart: () => Promise<any>
}


// default value للـ context
export const cartContext = createContext<CartContextType | null>(null)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null)
  const [allProducts, setAllProducts] = useState<CartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  async function handleCart() {
    const data = await getProductFromCart()

    setAllProducts(data.data.products)

    let sum = 0
    data.data.products.forEach((product: CartProduct) => {
      sum += product.count
    })
    setNumOfCartItems(sum)

    setTotalPrice(data.data.totalCartPrice)

    return data
  }

  useEffect(() => {
    handleCart()
  }, [])

  return (
    <cartContext.Provider
      value={{ numOfCartItems,setNumOfCartItems, handleCart, setAllProducts, allProducts,  totalPrice,}}
>
      {children}
    </cartContext.Provider>
  )
}
