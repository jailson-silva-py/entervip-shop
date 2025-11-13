import { signIn } from "auth";
import { JSX } from "react";
import { IconType } from "react-icons";
import { SiGoogle } from "react-icons/si";
import { TbBrandGoogle } from "react-icons/tb";

interface Iprops {

    socialName: 'google'

}

const FirsLetterUpper = (s:string) => {
    const newS = s.trim()[0].toUpperCase() + s.substring(1, s.length)
    return newS

}

const arrayIcons = {

    google:<SiGoogle size={24}/>

}

const LoginSocialButon = async ({socialName}:Iprops) => {

    const name = FirsLetterUpper(socialName)

    return (

        <form action={async () => {

            "use server";
            await signIn(socialName)

        }}>

        <button type="submit" className="h-10 shadow-[0_0_0_1px]
        shadow-shadow flex items-center cursor-pointer gap-2
        rounded-sm px-4 py-2 tracking-widest font-light hover:bg-bg-2 focus-within:opacity-70">

            {socialName in arrayIcons && arrayIcons[socialName]}
            <span className="text-sm">Faça login com {name}</span>
            
        </button>

        </form>

    )

} 

export default LoginSocialButon