import getCategory from '@/Api/category.Api'
import { CategoryType } from '@/type/products.type'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse product categories",
}

export default async function Page() {
  const allCategory: CategoryType[] = await getCategory()

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allCategory.map((category) => (
          <Link
            href={`/Categories/${category._id}`}
            key={category._id}
            className="group border rounded-xl shadow-sm hover:shadow-lg transition bg-white overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-64 sm:h-72 md:h-80">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-center text-gray-800 group-hover:text-green-600">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
