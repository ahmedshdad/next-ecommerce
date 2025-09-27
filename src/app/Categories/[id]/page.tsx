import React from "react"
import { ProductType } from "@/type/products.type"
import Product from "@/app/_component/productCarts/Product"

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params

  // Get category details
  const categoryRes = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: "no-store",
  })
  if (!categoryRes.ok) return <h2 className="text-red-500 text-center mt-10">Category not found</h2>
  const category = await categoryRes.json()

  // Get products in this category
  const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`, {
    cache: "no-store",
  })
  if (!productsRes.ok) return <h2 className="text-red-500 text-center mt-10">Failed to load products</h2>
  const { data: products } = await productsRes.json()

  return (
    <div className="p-6">
      {/* Category Title */}
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
        {category.data?.name || "Category"}
      </h2>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: ProductType) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
