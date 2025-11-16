import { TbArrowRight, TbLoader } from "react-icons/tb"
import CardProduct from "./CardProduct"
import { countProductsByCategory, getProductIdsByCategory } from "@/actions";
import { Suspense } from "react";
import Paginator from "./Paginator";
import Link from "next/link";


type ProductsCategoryProps =  {

    title:string,
    searchParams:Promise<{[key:string]: string | string[] | undefined}>
    slug:string,
    pageSize:number
} 

const Loading = () => <div className="h-64 w-37 flex items-center
justify-center shadow-default shadow-shadow bg-bg-2 opacity-80">
<TbLoader size={32} className="text-text animate-spin"/>
</div>


const ProductsCategory = async ({ searchParams, pageSize, title, slug }:ProductsCategoryProps) => {
    
    const s = await searchParams
    const products = await getProductIdsByCategory(slug, parseInt(s[slug+'-page'] as string || '1'), pageSize)
    const length = await countProductsByCategory(slug) || 1
    
    return (
        
        <div className="p-4 w-screen h-min flex flex-col gap-4">

        <Link href={`/${slug}`} className="w-max flex items-center gap-2 text-2xl
        font-thin tracking-widest group hover:font-normal">
           <h1>{title}</h1>
            <TbArrowRight size={24} className="text-text
            group-hover:translate-x-2 duration-300 ease-in
            transition-transform"/>
        </Link>
        <aside>

        

        </aside>
        <ul className="grid place-items-center gap-1
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">

            {products && products?.map(({id}) => {



                return <li key={id}>
                    <Suspense fallback={<Loading/>}>
                    <CardProduct productId={id}/>
                    </Suspense>
                    </li>

            })}

        </ul>
        <Paginator pageSize={Math.ceil(length / 10)}
        namePage={slug}/>
       
        </div>
       

    )

}

export default ProductsCategory