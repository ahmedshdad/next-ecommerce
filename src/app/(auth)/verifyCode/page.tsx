'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { verifySchema, verifyType } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Verify() {
  const router = useRouter()

  const myForm = useForm<verifyType>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(verifySchema),
    mode: 'all',
  })

  async function handleVerify(values: verifyType) {
    const loading = toast.loading('loading')
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        method: 'post',
        data: values,
      }

      const { data } = await axios.request(options)
      console.log(data)

      toast.success('Code verified successfully')
      router.push('/resetPassword')
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <>
      <title>Verify Code</title>
      <div className="w-full lg:w-2/3 mx-auto h-screen flex items-center justify-center p-5">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">
            Verify Code
          </h2>

          <Form {...myForm}>
            <form
              onSubmit={myForm.handleSubmit(handleVerify)}
              className="space-y-4"
            >
              {/* Reset Code */}
              <FormField
                control={myForm.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the code sent to your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full bg-green-600 p-3 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
              >
                Verify
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
