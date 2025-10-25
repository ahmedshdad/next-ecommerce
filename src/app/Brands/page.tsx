'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { getAllBrands } from '@/Api/brand.api'

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await getAllBrands()
        setBrands(data.data)
      } catch (err: any) {
        toast.error(err.message || 'Failed to load brands')
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  // --- 💡 التعديل هنا ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <i className="text-green-500 fa-3x fa-solid fa-spinner fa-spin-pulse"></i>
      </div>
    )
  }
  // ---------------------

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Our Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition hover:scale-105 duration-200 p-4 flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}