"use server";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "prisma";
import { Prisma } from "./generated/prisma/browser";


export async function getCategory(slug:string) {
    "use cache";

    cacheTag(`cat:${slug}`)
    cacheLife({revalidate:1800})

    return prisma.category.findUnique({

        where:{slug:slug},
        select:{products:true, name:true}

    })
    

}

export async function getProductsByCategory (slug:string, maxElements:number, page:number, full=false) {
    "use cache";
    cacheTag(`prod:${slug}`)
    cacheLife({revalidate:1800})

  
    if (!full) {

        const prod = await prisma.product.findMany({

        where:{status:'ACTIVE', categories:{some:{category:{slug}}}},
        select:{id:true,
        name:true, images:true, slug:true, 
        variants:{
            select:{price:true}
        },

        },
        take:maxElements,
        skip: (page - 1) * maxElements,
        orderBy:{createdAt:'desc'}
        })

        const newProd = prod.map((v) => {

            const newPrices = v.variants.map((obj) => ({...obj, price:{...obj.price, amount:obj.price?.amount.toString(), compareAt:obj.price?.compareAt?.toString()}}))

            return {...v, variants:{...newPrices}}

        })

        return newProd

    }
   
    const prod = await prisma.product.findMany({

        where:{slug, status:'ACTIVE'},
        include:{images:true, variants:{
            include:{price:true}}, brand:true},
        take:maxElements,
        skip: (page - 1) * maxElements,
        orderBy:{createdAt:'desc'}
    })

    const newProd = prod.map((v) => {

            const newPrices = v.variants.map((obj) => ({...obj, price:{...obj.price, amount:obj.price?.amount.toString(), compareAt:obj.price?.compareAt?.toString()}}))

            return {...v, variants:{...newPrices}}

        })

    return newProd
}

export async function getProductIdsByCategory(
    slug:string, page:number, pageSize=24) {
    
    "use cache";
    cacheTag(`prod-list:${slug}`)
    cacheLife({revalidate:1800})

    const cat = await prisma.category.findUnique({
    where:{slug}, select:{id:true}
    })

    if (!cat) return []

    const products = await prisma.product.findMany({
        
        where:{status:'ACTIVE', categories:{ some: {
            categoryId:cat.id
        }}},

        take:pageSize,
        skip:(page - 1) * pageSize,
        orderBy:{name:'asc'},
        select:{id:true}
    })

    return products
    
}

export async function countProductsByCategory(slug:string) {

    "use cache";
    cacheTag(`prod-list:${slug}`)
    cacheLife({revalidate:1800})
    const category = await prisma.category.findUnique({

            where:{slug:slug},
            select:{products:{select:{product:{select:{status:true, id:true}}}}}
            
        })

    const visibleProducts = category?.products.filter((v) => {
        const isActive = v.product.status === 'ACTIVE'
        if (isActive) return true

    })
    

    return visibleProducts?.length
}

export async function getProductById(id:string) {
    "use cache";

    cacheLife({revalidate:1800})
    cacheTag(`prod:${id}`)

    const product = await prisma.product.findFirst({

            where:{id, status:'ACTIVE'},
            select:{
            name:true, images:true, slug:true, 
                variants:{
                select:{price:true},
                
                }
            
            }

    })

    const newProduct = () => {

            const newPrices = product?.variants.map((obj) => ({...obj, price:{...obj.price, amount:obj.price?.amount.toString(), compareAt:obj.price?.compareAt?.toString()}}))

            return {...product, variants:{...newPrices}}

        }
    
    return newProduct()

}



export async function findUserById(userId:string|undefined) {

    "use cache";
    cacheTag(`user:${userId}`)
    cacheLife({revalidate:60*60*24*3})
    if(!userId) return
    
    
    const user = await prisma.user.findUnique({
        where:{id:userId}})

    return user
}

export async function name(params:string) {
    
}