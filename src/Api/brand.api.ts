'use server'

export async function getAllBrands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch brands")
  }

  const data = await response.json()
  return data
}
