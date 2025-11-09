import { TbArrowRight } from "react-icons/tb"
import CardProduct from "./CardProduct"

type ProductsCategoryProps =  {

    title:string,
    listforProducts?: any

} 

const ProductsCategory = ({title}:ProductsCategoryProps) => {


    return (

        <div className="p-4 w-screen h-min flex flex-col gap-4">

        <div className="flex items-center gap-2 text-2xl
        font-thin tracking-widest">
            <h1>{title}</h1>
            <TbArrowRight size={24} className="stroke-1"/>
        </div>

        <div className="p-4 overflow-hidden flex flex-wrap gap-2
        ">

            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            {/* <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/>
            <div className="bg-amber-300"/> */}

        </div>

        <button className="tracking-wider font-medium p-1 shadow-[0_0_0_1px] w-30
        shadow-shadow rounded-sm mx-auto cursor-pointer
        hover:bg-bg-hover">
        Ver mais ...
        </button>

        </div>

    )

}

export default ProductsCategory