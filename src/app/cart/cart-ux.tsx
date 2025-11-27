"use client"
import BtnWithLoading from "@/components/BtnWithLoading"
import useOutclickElement from "@/hooks/useOutClick"
import usePaginator from "@/hooks/usePaginator"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { RefObject, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { TbChevronsLeft, TbChevronsRight, TbTrash } from "react-icons/tb"


export const BtnDelete = () => {

    return (
    <BtnWithLoading size={24} type="submit" className="w-full h-full 
    cursor-pointer flex items-center
    justify-center">
    <TbTrash size={24} className="text-red-700 stroke-[.5]"/>
    </BtnWithLoading>
    )
}

interface InputQuantidadeProps {

    qty:number,
    qtyAvaliable:number

}

export const InputQuantidade = ({qty, qtyAvaliable}:InputQuantidadeProps) => {

    const [editable, setEditable] = useState(false)
    const { pending } = useFormStatus()
    const {refElement} = useOutclickElement(
        () => setEditable(false))

    

    return (
    <>
   { editable ?
   <>
   {pending ? 
   <div className="shadow-shadow shadow-default px-4 h-8 py-0.5 w-22
    rounded-sm bg-bg opacity-25 animate-pulse"/>
   :
   <input defaultValue={qty} type="number"
    placeholder={`1 - ${qtyAvaliable}`}
    className="shadow-shadow shadow-default px-4 py-0.5 w-22
    outline-none rounded-sm text-sm h-6  max-md:text-xs appearance-none"
    ref={refElement} autoFocus name="qty" min={1} max={qtyAvaliable}/>
    }
    </>
    :
    <>
    { pending ? 
    <div className="shadow-default
    py-0.5 px-4 bg-bg w-22 h-8 rounded-sm animate-pulse"/>
    :
    
    <button className="hover:shadow-shadow shadow-default
    py-0.5 hover:px-4 transition-[padding] duration-300
    ease-out w-max h-6  rounded-sm text-xs
    cursor-text font-medium" onClick={() => setEditable(true)}>
        <span className="mr-1 font-semibold">{qty}</span>
        Unidade{'(s)'}
    </button>
    
    }
    <span className="ml-1 items-center hidden max-md:flex text-xs h-6">de<strong className="ml-1">{qtyAvaliable}</strong></span>
    </>
    }
    </>
    )

}

type PaginatorCartProps = {
    countCartItems:number,
    pageSize:number
}

const handleScrollX = (
refList:RefObject<HTMLUListElement | null>, page:number) => () => {

    if (!refList.current) return
    const list = refList.current;
   
    list.scrollTo({behavior:'smooth',
        left:(page-2) * 32})

}

export const PaginatorCart = ({countCartItems, pageSize}:PaginatorCartProps) => { 
    
    const maxPages = Math.ceil(countCartItems / pageSize)
    
    const refListPage = useRef<HTMLUListElement>(null)
    const search = useSearchParams()
    const pageSearch = parseInt(search.get('cart-page') || '1')
    const { page, getLinkPage } = 
    usePaginator(maxPages, "cart", handleScrollX(refListPage, pageSearch))
    

    return (

    <div className="relative my-6 flex gap-2 h-9 w-full justify-center items-center">
        {pageSearch > 2 && <Link href={getLinkPage(1)}
        className="h-6 w-6 flex items-center justify-center
        bg-bg-accent hover:brightness-95 text-text text-sm
        shadow-shadow shadow-default rounded-sm font-semibold">
            1
        </Link>}

        <div className="relative h-full">
        <div className="absolute -bottom-2 left-5/10 -translate-x-5/10 h-1 w-24 rounded-2xl bg-bg-2"/>
        <ul className="flex px-1 gap-2 w-24 h-full items-center justify-start
        overflow-hidden"
        ref={refListPage}>
        
        {Array.from({length:maxPages}, (_, k) => {

            return (

            <li key={k} className="h-max">
            <Link href={getLinkPage(k+1)}
            className={`flex items-center justify-center w-6 h-6 bg-bg-accent rounded-sm
            shadow-default hover:brightness-95 font-medium text-sm
            ${k+1 === page ? "shadow-gold bg-gold-aph":"shadow-shadow"}`}>
            {k+1}
            </Link>
            </li>

            )

        })}
        </ul>
        </div>

        { pageSearch < 5 && <Link href={getLinkPage(maxPages)}
        className="h-6 w-6 flex items-center justify-center
        bg-bg-accent hover:brightness-95 text-text text-sm
        shadow-shadow shadow-default rounded-sm font-semibold">
            {maxPages}
        </Link>}
    </div>

    )

}