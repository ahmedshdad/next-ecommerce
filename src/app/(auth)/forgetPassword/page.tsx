'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgetType } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { forgetSchema } from './../../../schemas/register.schema'

export default function ForgetPassword() {
  const router = useRouter()

  const myForm = useForm<forgetType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgetSchema),
    mode: 'all',
  })

  async function handleforget(values:forgetType) {
    const loading = toast.loading('loading')
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        method: 'post',
        data: values,
      }

      const { data } = await axios.request(options)

      console.log(data)
      if (data.statusMsg == 'success') {
        toast.success('Check your mail')
        router.push('/verifyCode')
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <>
      <title>Forget Password</title>
      <div className="w-full lg:w-2/3 mx-auto h-screen flex items-center justify-center p-5">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">
            Forget Password
          </h2>

          <Form {...myForm}>
            <form
              onSubmit={myForm.handleSubmit(handleforget)}
              className="space-y-4"
            >
              <FormField
                control={myForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full bg-green-600 p-3 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
              >
                Send Reset Link
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
