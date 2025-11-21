import { countProductsByCategory, getCategory, getProdIdsMostPopularCategory, getProductsByCategory } from "@/actions"
import CardProduct from "@/components/CardProduct"
import LoadingCard from "@/components/LoadingCard"
import Paginator from "@/components/Paginator"
import ProductsCategory from "@/components/ProductsCategory"
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
    console.log(category)
    
    return (
        <div className="p-4 flex flex-col gap-2 tracking-widest">
        
        <h1 className="text-5xl text-center font-medium my-6">
            {category?.name ?? slug.toUpperCase()}
        </h1>
        
        <ProductsCategory pageSize={pageSize} searchParams={searchParams}
        slug={slug} title="Os mais populares" namePage="popular"
        customIds={getProdIdsMostPopularCategory(slug, pageSize,
            parseInt(filter["popular-page"] || '1')
        )}/>
        
        <ProductsCategory pageSize={pageSize} searchParams={searchParams}
        slug={slug} title="Maiores avaliações" namePage="most-reviews"
        customIds={getProdIdsMostPopularCategory(slug, pageSize, 
            parseInt(filter["most-reviews-page"] || '1')
        )}/>

        <ProductsCategory pageSize={pageSize} searchParams={searchParams}
        slug={slug} title="Mais baratos" namePage="lowest-price"
        customIds={getProdIdsMostPopularCategory(slug, pageSize, 
            parseInt(filter["lowest-price-page"] || '1')
        )}/>

        <ProductsCategory pageSize={pageSize} searchParams={searchParams}
        slug={slug} title="Novidades" namePage="news"
        customIds={getProdIdsMostPopularCategory(slug, pageSize, 
            parseInt(filter["news-page"] || '1')
        )}/>
   

        </div>

    )

}

export default Category