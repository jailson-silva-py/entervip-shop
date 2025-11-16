"use client";
import usePaginator from "@/hooks/usePaginator";
import Link from "next/link";
import { TbChevronCompactLeft, TbChevronCompactRight, TbChevronsLeft } from "react-icons/tb";


interface PaginatorProps {

    pageSize:number,
    namePage:string,

}

const Paginator = ({pageSize, namePage}:PaginatorProps) => {


    const {nextPage, page, previousPage, pathname} = usePaginator(pageSize, namePage)
   
    return (
    <div className="mx-auto mt-2 w-max h-20">
        <p className="flex gap-2 [&>a]:text-cyan-900 
        [&>a]:font-extrabold justify-center">
            <Link href={`${pathname}?${namePage}-page=1`}>
            {page.page+page.skip}
            </Link>
            
            <span>de</span>
            <Link href={`${pathname}?${namePage}-page=${pageSize}`}>
            {pageSize}
            </Link>
        </p>

        {pageSize > 1 && <div className="flex gap-2 items-center">
        {pageSize > 4 && <Link href={`${pathname}?${namePage}-page=1`}
        scroll={false}
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
            <button key={i} className={`h-4 w-4 rounded-full
            ${i === page.page - 1 ? 'bg-fg': 'bg-bg'}
            shadow-default shadow-shadow hover:scale-125
            cursor-pointer`} />))}
          
        </div>
        
        <button onClick={nextPage} className="bg-bg 
        hover:bg-bg-2 hover:scale-115 p-2 rounded-full">
            <TbChevronCompactRight size={24}/>
        </button>

        {pageSize > 4 && <Link href={`${pathname}?${namePage}-page=${pageSize}`}
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