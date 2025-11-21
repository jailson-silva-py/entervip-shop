"use server";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "prisma";

export async function getCategory(slug:string, minimize=false) {
    "use cache";

    cacheTag(`cat:${slug}`)
    cacheLife({revalidate:1800})

    return prisma.category.findUnique({

        where:{slug},
        select:{products:!minimize, name:true}

    })
    

}


export async function getAllCategories(take=5) {

    "use cache";
    cacheTag('cats')
    cacheLife({revalidate:1800})
    

    return prisma.category.findMany({
        
        select:{slug:true, name:true},
        take:take

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

export async function getProdIdsMostPopularCategory(slugCat:string, maxElements:number, page:number) {
    
    "use cache";
    cacheTag(`prod-list:${slugCat}`)
    cacheLife({revalidate:1800})

    return prisma.product.findMany({

        where:{
            categories:{
                some:{
                    category:{
                        slug:slugCat
                    }
                }
            },
            status:'ACTIVE'
        },
        orderBy:{reviews:{_count:'desc'}},
        take:maxElements,
        skip:(page - 1) * maxElements,
        select:{id:true}
    })

}

export async function getProdIdsLowestPriceCategory(slugCat:string, maxElements:number, page:number) {
    
    /* sem filtragem de preço por enquanto (até encontrar uma forma que
       não seja "gambiarra"*/
    "use cache";
    cacheTag(`prod-list:${slugCat}`)
    cacheLife({revalidate:1800})
    return prisma.product.findMany({

    where:{
        categories:{
            some:{
                category:{slug:slugCat

                }
            }
        }
    },
    select:{id:true}

    })
}

export async function getProdIdsNewsCategory(slugCat:string, maxElements:number, page:number) {
    
    "use cache";
    cacheTag(`prod-list:${slugCat}`)
    cacheLife({revalidate:1800})
    
    return prisma.product.findMany({

        where:{
            categories:{
                some:{
                    category:{
                        slug:slugCat
                    }
                }
            }
        },
        orderBy:{createdAt:'desc'},
        take:maxElements,
        skip:(page - 1) * maxElements,
        select:{id:true}
    })

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

export async function getBrandsForCategory(slug:string) {
    "use cache";
    cacheTag(`brand:${slug}`)
    cacheLife({revalidate:1800})
    const brands = await prisma.brand.findMany({
    
        where:{
            products:{
                some:{
                    categories:{
                        some:{
                            category:{slug}
                        }
                    }
                }
            },
        

    }})


    return brands

}

export async function getBrandsForCategoryClient(search:string) {

    const brands = await prisma.brand.findMany({
    
        where:{
            products:{
                some:{
                    searchText:{

                        contains:search.toLocaleLowerCase().trim()
                    }
                }
            },
        

    }})


    return brands

}

interface valueObjType {
    min:string | undefined,
    max:string | undefined,
}

export async function filterProducts(brandSlug?:string, classification?:string,
    valueObj?:valueObjType, searchText?:string) {
    
    const maxClassification = classification ? Math.min(parseInt(classification) + 1, 5): undefined
    const minClassification = classification ? parseInt(classification) - 1 : undefined
    const newValueObj = {
        min:valueObj?.min ? parseInt(valueObj.min):undefined,
        max:valueObj?.max ? parseInt(valueObj.max):undefined}

    const products = await prisma.product.findMany({

        where:{
            searchText:{
            contains:searchText
            }, 
            status:'ACTIVE',
            brand:{slug:brandSlug},
            reviews:{
                every:{
                    rating:{
                        gte:minClassification,
                        lte:maxClassification
                    }
                }
            },
            variants:{
                some:{
                    price:{
                        amount:{

                            
                            gte:newValueObj?.min,
                            lte:newValueObj?.max,

                            
                        }
                    }
                }
            }
        },
        include:{variants:{include:{price:true}}},
        
    })

    return products

}

export async function findUserById(userId:string|undefined) {

    "use cache: private";

    cacheTag(`user:${userId}`)
    cacheLife({stale:60*15})
    if(!userId) return
    
    
    const user = await prisma.user.findUnique({
        where:{id:userId}})

    return user
}
