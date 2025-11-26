"use client"
import BtnWithLoading from "@/components/BtnWithLoading"
import useOutclickElement from "@/hooks/useOutClick"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { TbTrash } from "react-icons/tb"


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