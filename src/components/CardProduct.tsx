import Image from "next/image"
import { TbStar } from "react-icons/tb"

const CardProduct = () => {

    return (

        <div className="bg-bg flex flex-col gap-1 text-sm
        font-light tracking-widest
        shadow-[0_0_0_1px] overflow-hidden shadow-shadow p-2
        rounded-sm inset-shadow-sm h-67 w-37
        hover:-translate-y-2 hover:shadow-xl duration-300">

        <div className="relative flex-1 min-h-6/10">
        <Image alt={"product-name"}  src="/product.webp"
        fill loading="lazy" draggable={false} unselectable="on"/> 
        </div>

        <div className="flex-1">

        <span className="line-clamp-2 ">
        Produto com um nome aaaaaaaaaaaaaaaaaaa...
        </span>
        <p>de:
        
            <span className="font-medium"> <del>BRL 50,99</del></span>
        
        </p>
        <p>por: <span className="font-medium">BRL 36,99 </span></p>
        <div className="flex flex-row gap-1 items-center">
        <TbStar className="fill-fg stroke-[.5]" size={16}/>
        <span className="font-normal">4.6</span>
        </div>

        </div>
        </div>

    )

}

export default CardProduct