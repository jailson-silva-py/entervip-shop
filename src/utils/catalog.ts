import { unstable_cache } from "next/cache";
import { prisma } from "prisma";


export async function getCachedCategory(slug:string) {

    unstable_cache(async () => await prisma.category.findUnique({

        where:{slug:slug},
        select:{products:true, name:true}

    }),
    ['cat', slug],
    {revalidate:1800, tags:[`cat:${slug}`]}
    )

}

export async function getCachedProdCategory(slug:string, page:number, pageSize=24) {
    
    unstable_cache(async () => {
    const cat = await prisma.category.findUnique({
        where:{slug}, select:{id:true}
    })

    if (!cat) return []

    return await prisma.product.findMany({
        
        where:{status:'ACTIVE', categories:{ some: {
            categoryId:cat.id
        }}}

    })
    }, 
    ['prod-list', slug, String(page)],
    {revalidate:1800, tags:[`prod:${slug}`]}
    )

}