"use server"
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { unstable_cache } from "next/cache";
import { prisma } from "prisma";


export async function getCategory(slug:string) {

    return unstable_cache(async () => await prisma.category.findUnique({

        where:{slug:slug},
        select:{products:true, name:true}

    }),
    ['cat', slug],
    {revalidate:1800, tags:[`cat:${slug}`]}
    )

}

export async function getProductIdsByCategory(
    slug:string, page:number, pageSize=24) {
    
    const products = await (unstable_cache(async () => {
    const cat = await prisma.category.findUnique({
        where:{slug}, select:{id:true}
    })

    if (!cat) return []

    const products =  await prisma.product.findMany({
        
        where:{status:'ACTIVE', categories:{ some: {
            categoryId:cat.id
        }}},

        take:pageSize,
        skip:(page - 1) * pageSize,
        orderBy:{name:'asc'},
        select:{id:true}
    })

    
    
    return products
    }, 
    ['prod-list', slug, String(page)],
    {revalidate:1800, tags:[`prod:${slug}`]}
    ))()

    return products
    
}

export async function countProductsByCategory(slug:string) {

    return (unstable_cache(async () => {

        const products = await prisma.category.findUnique({

            where:{slug:slug},
            select:{products:{select:{productId:true}}}
            
        })

        return products?.products.length

    }, 
    ['count-prod', slug], 
    {revalidate:1800, tags:[`prod:${slug}`]})
    )()
    
}

export async function getProductById(id:string) {

    return (unstable_cache(async () => {

        return prisma.product.findFirst({

            where:{id},
            select:{
            name:true, images:true, slug:true, 
                variants:{
                    select:{price:true}
                }
            
            }

        })

    }, 
    ['prod', id],
    {revalidate:1800, tags:[`prod:${id}`]}))()

}



export async function findUserById() {

    const session = await auth()
    if(!session?.user) return
    

    const user = await prisma.user.findUnique({
        where:{id:session?.user?.id}})

    return {user, session}
}

export async function name(params:string) {
    
}