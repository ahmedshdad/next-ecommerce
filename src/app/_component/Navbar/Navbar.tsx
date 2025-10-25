 

'use client'

import React, { useContext, useState } from 'react'
import logo from '../../../../src/app/images/freshcart-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingCart, Menu, X } from 'lucide-react'
import { cartContext } from '@/app/context/cart.context'

export default function Navbar() {
  const context = useContext(cartContext)
  const { data } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  async function handleLogout() {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" className="w-[120px] h-auto" />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex gap-4 items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/Products">Products</Link></li>
          <li><Link href="/Categories">Categories</Link></li>
          <li><Link href="/Brands">Brands</Link></li>
          
          {data && <li><Link href="/allorders">Orders</Link></li>}
        </ul>

        {/* Right Side (Desktop) */}
        <ul className="hidden md:flex gap-4 items-center">
          {data && (
            <li className="relative flex gap-3">
              <Link href="/wishlist"><Heart className="text-green-500" /></Link>
              <Link href="/cart"><ShoppingCart className="text-black" /></Link>
              {(context?.numOfCartItems ?? 0) > 0 && (
                <span className="bg-green-500 text-white w-6 h-6 rounded-full absolute -top-2 -end-2 flex justify-center items-center text-sm">
                  {context?.numOfCartItems}
                </span>
              )}
            </li>
          )}

          {/* Socials */}
          <li><i className="fa-brands fa-instagram"></i></li>
          <li><i className="fa-brands fa-facebook"></i></li>
          <li><i className="fa-brands fa-tiktok"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-linkedin"></i></li>
          <li><i className="fa-brands fa-youtube"></i></li>

          {/* Auth */}
          {data ? (
            <>
              <li onClick={handleLogout} className="cursor-pointer">Logout</li>
              <li className="text-green-600">Hi {data.user?.name}</li>
            </>
          ) : (
            <>
              <li><Link href="/register">Register</Link></li>
              <li><Link href="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Products">Products</Link></li>
            <li><Link href="/Categories">Categories</Link></li>
            <li><Link href="/Brands">Brands</Link></li>
            {data && <li><Link href="/allorders">Orders</Link></li>}

            {data && (
              <li className="relative flex gap-3">
                <Link href="/wishlist"><Heart className="text-green-500" /></Link>
                <Link href="/cart"><ShoppingCart className="text-black" /></Link>
                {(context?.numOfCartItems ?? 0) > 0 &&(
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full absolute -top-2 -end-2 flex justify-center items-center text-sm">
                    {context?.numOfCartItems}
                  </span>
                )}
              </li>
            )}

            {/* Auth (Mobile) */}
            {data ? (
              <>
                <li onClick={handleLogout} className="cursor-pointer">Logout</li>
                <li className="text-green-600">Hi {data.user?.name}</li>
              </>
            ) : (
              <>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
