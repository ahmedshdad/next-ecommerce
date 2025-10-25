'use client'

import { makeCashPayment, makeOnlinePayment } from '@/Api/checkout.api'
import { cartContext } from '@/app/context/cart.context'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { checkoutSchema, checkoutType } from '@/schemas/checkout.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Checkout() {
  const context = useContext(cartContext)
  const { id }: { id: string } = useParams()
  const router = useRouter()
  const [paymentFlag, setPaymentFlag] = useState<'online' | 'cash' | ''>('')

  const myForm = useForm<checkoutType>({
    defaultValues: { details: '', phone: '', city: '' },
    resolver: zodResolver(checkoutSchema),
    mode: 'all',
  })

  async function handleCheckout(values: checkoutType) {
    const loading = toast.loading("Processing your payment...")
    try {
      if (paymentFlag === 'cash') {
        await makeCashPayment(id, values)
        context?.handleCart()
        toast.success("Order placed successfully")
        router.push('/allorders')
      } else if (paymentFlag === 'online') {
        const data = await makeOnlinePayment(id, window.location.origin, values)
        if (data.status === 'success') {
          // Redirect للبوابة، وبعد الدفع بوابة الدفع ترجع للـ payment-success
          window.location.href = data.session.url
        }
      } else {
        toast.error("Please select a payment method")
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto">
      <h2 className="text-green-600 text-3xl font-semibold text-center mb-6">Checkout</h2>

      <Form {...myForm}>
        <form onSubmit={myForm.handleSubmit(handleCheckout)} className="space-y-4">
          <FormField
            control={myForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={myForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={myForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="submit"
              onClick={() => setPaymentFlag('online')}
              className="flex-1 bg-green-600 p-3 text-white rounded-md cursor-pointer text-lg hover:bg-green-700 transition"
            >
              Online Payment
            </button>
            <button
              type="submit"
              onClick={() => setPaymentFlag('cash')}
              className="flex-1 border-2 border-green-600 text-green-600 p-3 rounded-md cursor-pointer text-lg hover:bg-green-50 transition"
            >
              Cash Payment
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
