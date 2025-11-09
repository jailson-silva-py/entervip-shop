"use server"
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { prisma } from 'prisma'


export async function findUserById() {

    const session = await auth()
    if(!session?.user) return
    

    const user = await prisma.user.findUnique({
        where:{id:session?.user?.id}})

    return {user, session}
}