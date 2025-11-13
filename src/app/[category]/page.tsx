import { prisma } from "prisma"

interface Iprops {

    params:Promise<{category:string}>

}

export const revalidate = 1800

export async function generateStaticParams() {
    
    const categories = await prisma.category.findMany() 

    return categories.map((value) => ({

        category:value.slug

    }))

}


const Category = async ({params}:Iprops) => {

    const { category } = await params

    return (

        <h1>{category}</h1>

    )

}

export const dynamicParams = false

export default Category