"use client";
import usePaginator from "@/hooks/usePaginator";
import { TbChevronCompactLeft, TbChevronCompactRight } from "react-icons/tb";


interface PaginatorProps {

    pageSize:number,
    namePage:string

}

const Paginator = ({pageSize, namePage}:PaginatorProps) => {


    const {nextPage, page, previousPage} = usePaginator(pageSize, namePage)

    return (
    <div className="mx-auto w-max h-20 flex gap-2 items-center">

        <button onClick={previousPage} className="bg-bg 
        hover:bg-bg-2 hover:scale-115 p-2 rounded-full">
            <TbChevronCompactLeft size={24}/>
        </button>

        <div className="flex items-center gap-2">
            
            {Array.from({length:pageSize}, (_, i) => (
            <div key={i} className={`h-4 w-4 rounded-full ${i === page - 1 ? 'bg-fg': 'bg-bg'}
            shadow-default shadow-shadow hover:scale-125
            cursor-pointer`}/>))}
          
        </div>
        
        <button onClick={nextPage} className="bg-bg 
        hover:bg-bg-2 hover:scale-115 p-2 rounded-full">
            <TbChevronCompactRight size={24}/>
        </button>

    </div>
    )

}

export default Paginator