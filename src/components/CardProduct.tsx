import { getProductById } from "@/actions"
import Image from "next/image"
import Link from "next/link"
import { TbStar } from "react-icons/tb"

interface Iprops {

    productId:string

}

const CardProduct = async ({productId}:Iprops) => {

    const product = await getProductById(productId)
    const price = product?.variants[0].price
   

    return (
       
        <Link  href={`/product/${productId}`}
        className="bg-bg flex flex-col gap-1 text-sm
        font-light tracking-widest overflow-hidden  p-2 rounded-sm  h-67 w-37
        hover:-translate-y-2 hover:shadow-xl duration-300">
        
        <div className="relative flex-1 min-h-6/10">
        
        <Image alt={product?.name || 'product'} 
        src={product.images && product?.images[0]?.url ||
            "/product.webp"}
        fill loading="lazy" draggable={false} unselectable="on"/>
         
        </div>

        <div className="flex-1 flex flex-col gap-0.5">

        <span className="line-clamp-2 font-normal">
        {product?.name}
        </span>
        {price?.compareAt && 
        <p className="text-xs">de:
        
            <span className="font-normal">
                <del>{price.currency} {String(price?.compareAt)}</del>
            </span>
            
        </p>}
        <p className="font-medium">por: <span>{price?.currency} {String(price?.amount)}</span></p>
        <div className="flex flex-row gap-1 items-center">
        <TbStar className="fill-fg stroke-[.5]" size={16}/>
        <span className="font-normal">4.6</span>
        </div>

        </div>
        </Link>

    )

}

export default CardProduct