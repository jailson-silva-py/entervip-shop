import { countProductsByCategory, getProductsByCategory } from "@/actions"
import CardProduct from "@/components/CardProduct"
import Paginator from "@/components/Paginator"
import ProductsCategory from "@/components/ProductsCategory"
import { ProductForCard } from "@/types/utilityTypes"
import { firstLetterUpper } from "@/utils/slugUtil"
import { prisma } from "prisma"
import { Suspense } from "react"

interface Iprops {

    params:Promise<{category:string, products:ProductForCard}>
    searchParams:Promise<{[key:string]:string | string[] | undefined}>
}

export async function generateStaticParams() {
    
    const categories = await prisma.category.findMany() 

    return categories.map((value) => ({
            category:value.slug,
        }))
        


}

const Category = async ({searchParams, params}:Iprops) => {
   
    const { category } = await params
    const filter = await searchParams
    const products = await getProductsByCategory(category, 40 ,
        filter[category+'-'+'page'] as any)
    const length = await countProductsByCategory(category)
    
    return (
        <div className="p-4">
        <h1>{firstLetterUpper(category)}</h1>
        <ul className="grid place-items-center gap-1
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">

        {products.map((product) => {

            return <li key={product.slug}>

            <Suspense fallback={'p'}>
                <CardProduct productId={product.id}/>
            </Suspense>

            </li>

        })}

        </ul>
        <Paginator namePage={category} pageSize={
            length ? Math.ceil(length/40): 1}/>
        </div>

    )

}

export default Category