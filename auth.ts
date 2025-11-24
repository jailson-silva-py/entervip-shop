import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import google from 'next-auth/providers/google'
import { prisma } from './prisma'


export const { handlers, signIn, signOut, auth }  = NextAuth({

    session:{strategy:'jwt'},
    adapter:PrismaAdapter(prisma),
    providers:[google],
    callbacks:{

        session ({session, token}) {

           if (token.sub) {

            session.user.id = token.sub

           }

           return session

        },

        async signIn({user}) {


            if (user.id) {

                const existingCart = await prisma.cart.findUnique({
                    where:{
                        userId:user.id
                    }
                })

                if (!existingCart) {

                    await prisma.cart.create({

                        data:{userId:user.id}

                    })

                }

            }

            return true
        }

    }

})