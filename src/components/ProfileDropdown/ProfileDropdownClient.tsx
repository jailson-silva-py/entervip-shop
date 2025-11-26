"use client";
import useOutclickElement from "@/hooks/useOutClick";
import { User } from "@/types/utilityTypes";
import { signOut } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { TbLoader, TbLoaderQuarter, TbLogout2, TbShoppingCart, TbUser } from "react-icons/tb"




export const ProfileDropdownClient = ({user}:{user:User}) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const {refElement} = useOutclickElement(() => setOpen(false))

   

    if(!user && status==='unauthenticated') {

        return (
    <Link title="Fazer Login" href="login"
    className="mx-2 p-1 rounded-full shadow-[0_0_0_1px]
    shadow-shadow cursor-pointer hover:shadow-[0_0_0_2px]
    hover:scale-105 hover:[&>svg]:stroke-2">
        <TbUser size={24} className="text-text"/>
    </Link>
    )

    } else if (user){

    return <div className="relative" ref={refElement}>
    <button className="relative  mx-2 h-10 w-10 tracking-widest font-light flex
    flex-col items-center justify-center hover:scale-105 gap-2
    cursor-pointer group" 
    onClick={() => setOpen(prev => !prev)}>

        <Image priority alt={`Perfil de ${user.name}`}
        src={user.image || "/not-profile-image.webp"}
        width={50} height={50} className="rounded-full 
        group-hover:shadow-xl shadow-shadow"/>


    </button>
    {open && <ul className="absolute bg-bg rounded-sm p-2 flex flex-col
    gap-2 w-50 -bottom-3 left-1/2 translate-y-full z-3
    -translate-x-1/2 max-sm:-translate-x-9/10 shadow-shadow shadow-xs 
    before:content-[''] before:absolute before:top-1
    before:left-1/2 max-sm:before:left-9/10 before:-translate-x-1/2 before:-translate-y-full
    before:bg-bg before:h-5 before:w-5 
    before:[clip-path:polygon(0%_100%,100%_100%,50%_50%)]">

        <li className="w-full group overflow-hidden">
            <p className="font-medium text-center text-sm/snug
            truncate w-full"
            title={`email: ${user.email}`}>
                {user.email}
            </p>
            <p className="font-normal text-center truncate w-full
            text-base/snug"
            title={`usuário: ${user.name}`}>
                {user.name}
            </p>

            
        </li>
        <hr className="mx-auto h-1 w-9/10 opacity-10"/>
        <li className="group">
            <Link href="/profile" className="flex px-[20%] py-1
            gap-1 items-center justify-start cursor-pointer
            hover:bg-bg-2 rounded-sm">
            <TbUser size={24} className="text-text 
            group-hover:stroke-[1.5]"/>
            <span className="group-hover:font-normal">
                Ver perfil
            </span>
            </Link>
        </li>
        <li className="group">
            <Link href="/cart" className="flex px-[20%] py-1
            gap-1 hover:bg-bg-2 items-center justify-start
            cursor-pointer">
            <TbShoppingCart size={24} className="text-text
            group-hover:stroke-[1.5]"/>
            <span className="group-hover:font-normal">
                Ver Carrinho
            </span>
            </Link>
        </li>
        <li className="group">
            <button className="w-full flex px-[20%] py-1 gap-1 items-center
            justify-start hover:bg-bg-2 cursor-pointer"
            onClick={async () => {
                setLoading(true)
                await signOut()
                setLoading(false)
                }}>
                    
            {loading ? 
            <TbLoaderQuarter size={24} className="text-text
            animate-spin"/>
            : 
            <TbLogout2 size={24} className="text-text
            group-hover:stroke-[1.5]"/>}
            <span className="group-hover:font-normal">
                Log out
            </span>
            </button>
        </li>

    </ul>}
    
    </div>

    }

}
