'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getUserOrders } from '@/Api/order.api'

export default function PaymentSuccessPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    async function fetchOrders() {
      try {
        // ممكن نستخدم session_id من query لو حابب تأكد من الدفع
        const session_id = searchParams.get('session_id')
        if (!session_id) throw new Error('Invalid session')

        const data = await getUserOrders()
        setOrders(data)
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-green-600 text-3xl font-semibold text-center mb-6">Payment Successful!</h2>

      <p className="text-center mb-4">Thank you! Your order has been placed successfully.</p>
      <button
        className="block mx-auto bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
        onClick={() => router.push('/allorders')}
      >
        Go to My Orders
      </button>

      {orders.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Your Orders:</h3>
          <ul className="list-disc ml-5">
            {orders.map(o => (
              <li key={o._id}>{o._id} - {o.totalOrderPrice} EGP</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
