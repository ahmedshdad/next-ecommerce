
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
 
 
 
 
 

export const authOptions: NextAuthOptions = {


     pages : {
             signIn: '/login',

             },
    providers: [
            
            // pages('/login'),

        Credentials(
            {
                name: 'credetials',
                credentials: {
                    email: {},
                    password: {},


                },
                authorize: async (credentials) => {
                    const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {

                        method: 'post',
                        body: JSON.stringify({

                            email: credentials?.email,
                            password: credentials?.password

                        }),

                        headers: {

                            'Content-Type': 'application/json'
                        }
                        })

                    const payload = await response.json()
                    console.log('payload' , payload);
                    

                    if (payload.message == 'success') {

                        const decodedToken: { id: string } = jwtDecode(payload.token)

                        return {
                            id: decodedToken.id,
                            user: payload.user,
                            token: payload.token
                        }
                    }
                    else {
                        throw new Error('email or password is incorrect')
                    }
                    
                }
                
                })                

    ],

    
callbacks: {
  async jwt({ token, user }) {
   
    if(user){

        token.user = user?.user   
        token.token = user?.token
        
    }
        return token
  },


  async session({ session, token }) {
    
    session.user = token?.user
    return session
  }
}
 

}