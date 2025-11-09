"use client";
import useOutclickElement from '@/hooks/useOutClick';
import { JSX, useState } from 'react'

interface Iprops  {

    Icon:JSX.Element,
    name:string,
    listCategory:JSX.Element[]

}

const ItemExpandable  = ({Icon, name, listCategory}:Iprops) => {

    const [visible, setVisible] = useState(false)
    const { refElement } = useOutclickElement(() => setVisible(false))
    return(
    <li ref={refElement} 
    className='group group-hover:font-extrabold
    text-center flex-1 min-w-[60px] relative'>
    <button 
    onClick={() => setVisible(prev => !prev)}
    className="group flex items-center
    justify-center appearance-none border-none cursor-pointer
    bg-transparent hover:[&>svg]:stroke-2 hover:font-normal ">
        <span>{name}</span>
        {Icon}
    </button>

    {visible && 
    
    <ul className="absolute px-4 py-5 rounded-sm translate-y-full 
    -bottom-2.5 left-0  grid grid-cols-2 grid-rows-6 gap-y-2 gap-x-8 bg-bg-2 
    shadow-sm shadow-inset-shadow [&>li]:cursor-pointer
    [&>li]:hover:font-normal [&>li]:text-start min-w-25 w-45 max-h-[30vh]
    overflow-x-auto z-10">


        {listCategory.map((v) => v)}
   
    </ul>
    
    }
    
    </li>
    )
}

export default ItemExpandable