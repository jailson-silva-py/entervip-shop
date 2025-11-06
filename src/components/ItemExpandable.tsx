"use client";
import { JSX, useState } from 'react'

interface Iprops  {

    Icon:JSX.Element,
    name:string,
    listCategory:JSX.Element[]

}

const ItemExpandable  = ({Icon, name, listCategory}:Iprops) => {

    const [visible, setVisible] = useState(false)

    return(
    <>
    <button onClick={() => setVisible(prev => !prev)}
    className="group flex items-center
    justify-center appearance-none border-none cursor-pointer
    bg-transparent shadow-[0_0_0_1px] shadow-amber-600">
        <span>{name}</span>
        {Icon}
    </button>

    {visible && 
    
    <ul className="absolute px-4 py-5 rounded-2xl translate-y-full 
    -bottom-2.5 left-0  grid grid-cols-2 grid-rows-6 gap-y-2 gap-x-8 bg-bg-2 
    shadow-sm shadow-inset-shadow [&>li]:cursor-pointer
    [&>li]:hover:font-normal [&>li]:text-start min-w-25 w-45 max-h-[30vh]
    overflow-x-auto ">


        {listCategory.map((v) => v)}
   
    </ul>
    
    }
    
    </>
    )
}

export default ItemExpandable