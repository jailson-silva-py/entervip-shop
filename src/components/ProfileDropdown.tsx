"use client";
import { User } from "@/generated/prisma"
import useOutclickElement from "@/hooks/useOutClick";
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { TbFidgetSpinner, TbInnerShadowBottom, TbLoader, TbLoader2, TbLoaderQuarter, TbLogout2, TbShoppingCart, TbUser } from "react-icons/tb"


interface Iprops {

    user:User | undefined | null,
    session:Session | undefined

}

const ProfileDropdown = ({user, session}:Iprops) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const {refElement} = useOutclickElement(() => setOpen(false))

    return (
    <>
    {user && session ? 
    <div className="relative" ref={refElement}>
    <button className="relative  mx-2 h-10 w-10 tracking-widest font-light flex
    flex-col items-center justify-center hover:scale-105 gap-2
    cursor-pointer group" 
    onClick={() => setOpen(prev => !prev)}>

        <Image priority alt={`Perfil de ${user.name}`}
        src={user.image || session.user?.image!}
        width={50} height={50} className="rounded-full 
        group-hover:shadow-xl shadow-shadow"/>


    </button>
    {open && <ul className="absolute bg-bg rounded-sm p-2 flex flex-col
    gap-2 w-50 -bottom-3 left-1/2 translate-y-full z-3
    -translate-x-1/2 shadow-shadow shadow-xs 
    before:content-[''] before:absolute before:top-1
    before:left-1/2 before:-translate-x-1/2 before:-translate-y-full
    before:bg-bg before:h-5 before:w-5 
    before:[clip-path:polygon(0%_100%,100%_100%,50%_50%)]">

        <li className="group">
            <Link href="/profile" className="flex px-[20%] py-1
            gap-1 items-center justify-start cursor-pointer
            hover:bg-bg-2 rounded-sm">
            <TbUser size={24} className="stroke-1 
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
            <TbShoppingCart size={24} className="stroke-1
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
            <TbLoaderQuarter size={24} className="stroke-1
            animate-spin"/>
            :
            <TbLogout2 size={24} className="stroke-1
            group-hover:stroke-[1.5]"/>}
            <span className="group-hover:font-normal">
                Log out
            </span>
            </button>
        </li>

    </ul>}
    
    </div>:
    <Link title="Fazer Login" href="login"
    className="mx-2 p-1 rounded-full shadow-[0_0_0_1px]
    shadow-shadow cursor-pointer hover:shadow-[0_0_0_2px]
    hover:scale-105 hover:[&>svg]:stroke-2">
        <TbUser size={24} className="stroke-1 color-shadow"/>
    </Link>}
    </>
    )

}

export default ProfileDropdown