import { User } from "@/generated/prisma"
import { } from "@/types/db"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { TbLogin, TbUser } from "react-icons/tb"

interface Iprops {

    user:User | undefined | null,
    session:Session | undefined

}

const ProfileDropdown = ({user, session}:Iprops) => {

    
    return (
    <>
    {user && session ? <button className="h-25 w-25 tracking-widest font-light flex
    flex-col items-center justify-center gap-2 cursor-pointer">

        <Image priority alt={`Perfil de ${user.name}`}
        src={user.image || session.user?.image!} width={50} height={50}/>
        <p className="line-clamp-1">{user.name}</p>

    </button>:
    <Link href="login" className="p-1 rounded-full shadow-[0_0_0_1px]
    shadow-shadow cursor-pointer hover:shadow-[0_0_0_2px]
    hover:scale-105 hover:[&>svg]:stroke-2">
        <TbUser size={24} className="stroke-1 color-shadow"/>
    </Link>}
    </>
    )

}

export default ProfileDropdown