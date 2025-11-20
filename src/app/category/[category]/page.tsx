import { countProductsByCategory, getCategory, getProductsByCategory } from "@/actions"
import CardProduct from "@/components/CardProduct"
import LoadingCard from "@/components/LoadingCard"
import Paginator from "@/components/Paginator"
import { Suspense } from "react"

interface Iprops {

    params:Promise<{category:string}>
    searchParams:Promise<{[key:string]:string | undefined}>
}
const pageSize = 10

const Category = async ({searchParams, params}:Iprops) => {
   
    const { category:slug } = await params
    const category = await getCategory(slug, true)
    const filter = await searchParams
    const products = await getProductsByCategory(slug, pageSize,
    parseInt(filter[slug+'-'+'page'] || '1'))
    const length = await countProductsByCategory(slug)
    
    return (
        <div className="p-4 flex flex-col gap-4">
        
        
        <div className="flex flex-col gap-4 p-2">
        <h1 className="text-5xl text-center my-4 font-bold">
            {category?.name}
        </h1>
        <ul className="grid place-items-center gap-1
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">

        {products.map((product) => {

            return <li key={product.slug}>

            <Suspense fallback={<LoadingCard/>}>
                <CardProduct productId={product.id}/>
            </Suspense>

            </li>

        })}

        </ul>
        <Paginator namePage={slug} pageSize={
            length ? Math.ceil(length/pageSize): 1} />
        </div>
        </div>

    )

}

export default Category