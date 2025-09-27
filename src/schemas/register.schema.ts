 

 import * as zod from 'zod'
 




 export const registerSchema =  zod.object({
    name: zod.string().nonempty('name is requierd').min(3 , 'min 3 chars').max(20 , 'max 20 chars'),
    email: zod.email( 'email must  be valid').nonempty('email is required'),
    password:zod.string().nonempty("password is required").regex(/^[A-Z][A-Za-z0-9]{5,}$/ , 'start with capital char followed with 5 chars'),
    rePassword:zod.string().nonempty("password is required") ,

phone:zod.string().nonempty('Phoneis requierd').regex(/^01[0125][0-9]{8}$/ , 'must be egyption number')


 }).refine((object)=> object.password == object.rePassword ,{

path:['rePassword'],
error:'Password dont match'
 })


 

 export const loginSchema =  zod.object({
     
    email: zod.email( 'email must  be valid').nonempty('email is required'),
    password:zod.string().nonempty("password is required").regex(/^[A-Z][A-Za-z0-9]{5,}$/ , 'start with capital char followed with 5 chars'),
   
})

 export const forgetSchema =  zod.object({
     
    email: zod.email( 'email must  be valid').nonempty('email is required'),
   
})
 export const verifySchema =  zod.object({
     
    resetCode: zod.string().nonempty('restCode is required'),
   
})
    
 export const resetPasswordSchema =  zod.object({
     
    email: zod.email( 'email must  be valid').nonempty('email is required'),
    newPassword:zod.string().nonempty("password is required").regex(/^[A-Z][A-Za-z0-9]{5,}$/ , 'start with capital char followed with 5 chars'),
   
})

    
    export type registerType =zod.infer<typeof registerSchema>
    export type loginType =zod.infer<typeof loginSchema>
    export type forgetType =zod.infer<typeof forgetSchema>
    export type verifyType =zod.infer<typeof verifySchema>
    export type resetPasswordType =zod.infer<typeof resetPasswordSchema>