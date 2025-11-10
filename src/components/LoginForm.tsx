import { TbArrowRight } from "react-icons/tb"
import InputText from "./InputText"
import { Poppins } from "next/font/google"
import ClientFormMultiStep from "./ClientFormMultiStep"
import Link from "next/link"

const poppins = Poppins({

    subsets:['latin'],
    weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display:'swap'

})

const LoginForm = () => {



    return (
    <div className={`py-4 flex items-center flex-col gap-4 mt-[20vh] mx-auto
    w-9/10 max-w-125 h-100 rounded-sm shadow-[0_0_0_1px,8px_10px_10px_0px] shadow-shadow
    tracking-widest font-light ${poppins.className}`}>
    
    <h1 className="mb-4 block w-max text-3xl font-medium mx-auto">
        Login
    </h1>
    
    <ClientFormMultiStep/>

    <p className="text-xs">Esqueceu a senha?
        <Link className="text-blue-700 font-normal hover:font-medium" href="/recovery_account"> Recuperar</Link>
    </p>

    fotm
    </div>
    )

}

export default LoginForm