import { TbArrowRight, TbLoader } from "react-icons/tb"
import CardProduct from "./CardProduct"
import { countProductsByCategory, getProductIdsByCategory } from "@/actions";
import { Suspense } from "react";
import Paginator from "./Paginator";
import Link from "next/link";
import LoadingCard from "./LoadingCard";


type ProductsCategoryProps =  {

    title:string,
    searchParams:Promise<{[key:string]: string | string[] | undefined}>
    slug:string,
    pageSize:number,
    customIds?: null | Promise<{id:string}[]>
    namePage?:string
} 



const ProductsCategory = async (
    { searchParams, pageSize, title,slug, namePage, customIds=null }:ProductsCategoryProps) => {
    
    const s = await searchParams
    const products = await customIds ?? await getProductIdsByCategory(slug, parseInt(s[slug+'-page'] as string || '1'), 
    pageSize)
    const length = await countProductsByCategory(slug) || 1
    
    return (
        
        <div className="p-4 w-screen h-min flex flex-col gap-4">

        {!customIds ? <Link href={`/category/${slug}`} className="w-max flex items-center gap-2 text-2xl
        font-thin tracking-widest group hover:font-normal">
           <h1>{title}</h1>
            <TbArrowRight size={24} className="text-text
            group-hover:translate-x-2 duration-300 ease-in
            transition-transform"/>
        </Link>
        :
        <div className="w-max flex items-center gap-2 text-2xl
        font-thin tracking-widest">
            <h1>{title}</h1>
            <TbArrowRight size={24} className="text-text"/>
        </div>}

        <ul className="grid place-items-center gap-1
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">

            {products && products?.map(({id}) => {



                return <li key={id}>
                    <Suspense fallback={<LoadingCard/>}>
                    <CardProduct productId={id}/>
                    </Suspense>
                    </li>

            })}

        </ul>
        <Paginator pageSize={Math.ceil(length / pageSize)}
        namePage={namePage ?? slug}/>
       
        </div>
       

    )

}

export default ProductsCategory