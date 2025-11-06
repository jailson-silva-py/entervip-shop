import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import google from 'next-auth/providers/google'
import { prisma } from './prisma'


export const {handlers, signIn, signOut, auth}  = NextAuth({

    session:{strategy:'jwt'},
    adapter:PrismaAdapter(prisma),
    providers:[google],
    callbacks:{

        session ({session, token}) {

           if (token.sub) {

            session.user.id = token.sub

           }

           return session

        }

    }

})