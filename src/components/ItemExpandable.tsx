"use client";
import useOutclickElement from '@/hooks/useOutClick';
import { JSX, useState } from 'react'
import { makeSlug } from '@/utils/slugUtil';
import Link from 'next/link';

interface Iprops  {

    Icon:JSX.Element,
    name:string,
    listCategory:string[]

}

const ItemExpandable  = ({Icon, name, listCategory}:Iprops) => {

    const [visible, setVisible] = useState(false)
    const { refElement } = useOutclickElement(() => setVisible(false))
    return(
    <li ref={refElement} 
    className='group group-hover:font-extrabold
    text-center flex-1 min-w-[60px]'>
    <button 
    onClick={() => setVisible(prev => !prev)}
    className="group flex items-center
    justify-center appearance-none border-none cursor-pointer
    bg-transparent hover:[&>svg]:stroke-2 hover:font-normal ">
        <span>{name}</span>
        {Icon}
    </button>

    {visible && 
    
    <ul className="absolute w-screen h-40 max-w-100
    grid grid-cols-2 grid-rows-6 gap-2 sm:mx-2 px-4 py-5
    overflow-hidden rounded-sm translate-y-full -bottom-2.5
    max-sm:bottom-0 left-0 bg-bg-2 shadow-sm shadow-inset-shadow
    [&>li]:cursor-pointer [&>li]:hover:font-normal
    [&>li]:text-start z-10">


        {listCategory.map((v) => (
            <li key={v}>
            <Link href={`/category/${makeSlug(v)}`}>
            {v}
            </Link>
            </li>
        ))}
   
    </ul>
    
    }
    
    </li>
    )
}

export default ItemExpandable