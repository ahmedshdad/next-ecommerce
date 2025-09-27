   
   
   import * as zod from 'zod'
 
 
 export const checkoutSchema =  zod.object({
    details: zod.string('must be string').nonempty('Details is requierd'),
    
  
phone:zod.string().nonempty('Phoneis requierd').regex(/^(\+2)?01[0125][0-9]{8}$/ , 'must be egyption number'),
 city : zod.string('must be string').nonempty('City is requierd')

 } )

    
   export type checkoutType =zod.infer<typeof checkoutSchema>

