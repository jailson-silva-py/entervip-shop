"use client";
import usePaginator from "@/hooks/usePaginator";
import Link from "next/link";
import { TbChevronCompactLeft, TbChevronCompactRight, TbChevronsLeft } from "react-icons/tb";


interface PaginatorProps {

    pageSize:number,
    namePage:string,

}

const Paginator = ({pageSize, namePage}:PaginatorProps) => {


    const {nextPage, page, previousPage, getLinkPage} = usePaginator(pageSize, namePage)
   
    return (
    <div className="mx-auto mt-2 w-max h-20">
        <p className="flex gap-2 [&>a]:text-cyan-900 
        [&>a]:font-extrabold justify-center">
            <Link href={getLinkPage(1)} replace scroll={false}>
            {page}
            </Link>
            
            <span>de</span>
            <Link href={getLinkPage(pageSize)}>
            {pageSize}
            </Link>
        </p>

        {pageSize > 1 && <div className="flex gap-2 items-center">
        {pageSize > 4 && <Link href={getLinkPage(1)}
        scroll={false} replace
        className="flex items-center justify-center w-7 h-7
        rounded-full shadow-default shadow-shadow hover:bg-bg-2">
        1
        </Link>}
        <button onClick={previousPage} className="bg-bg 
        hover:bg-bg-2 hover:scale-115 p-2 rounded-full">
            <TbChevronCompactLeft size={24}/>
        </button>

        <div className="flex items-center gap-2">
            
            {Array.from({length:pageSize}, (_, i) => (
            <Link  href={getLinkPage(i+1)} key={i} className={`h-4 w-4 rounded-full
            ${i === page - 1 ? 'bg-fg': 'bg-bg'}
            shadow-default shadow-shadow hover:scale-125
            cursor-pointer`} replace scroll={false}/>))}
          
        </div>
        
        <button onClick={nextPage} className="bg-bg 
        hover:bg-bg-2 hover:scale-115 p-2 rounded-full">
            <TbChevronCompactRight size={24}/>
        </button>

        {pageSize > 4 && <Link href={getLinkPage(pageSize)}
        scroll={false}
        className="flex items-center justify-center w-7 h-7
        rounded-full shadow-default shadow-shadow hover:bg-bg-2">
        {pageSize}
        </Link>}
        </div>}

    </div>
    )

}

export default Paginator