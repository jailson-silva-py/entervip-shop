import { listCategoryObj } from "@/utils/listCategory"
import Image from "next/image"
import Link from "next/link"


const Footer = () => {

    return (

        <footer className="relative mt-32 flex gap-4 px-[20vw] py-26 bg-bg-2
        tracking-widest max-md:flex-col font-light">
            <div className="absolute inset-0 h-px bg-text w-full opacity-20"/>
            <div className="flex-1">
                <Image alt="logo" src={"/logo.png"} width={100} height={100}
                priority loading="eager"/>
                <h1 className="text-2xl font-bold bg-linear-to-r
                from-gold to-text bg-clip-text text-transparent
                drop-shadow-xs drop-shadow-shadow">
                    Entervip Shop
                </h1>
                <ul className="flex items-center gap-2 my-2 h-12.5">    

                    <li>
                        <Link href="" className="block hover:scale-110 ">
                        <Image alt="facebook" src="/facebook.svg"
                        width={50}
                        height={50}/>
                        </Link>
                    </li>

                    <li>
                        <Link href="" className="block hover:scale-110">
                        <Image alt="instagram" src="/instagram.svg"
                        width={50} height={50}/>
                        </Link>
                    </li>

                    <li>
                        <Link href="" className="block hover:scale-110">
                        <Image alt="x" src="/x.svg" width={50}
                        height={50}/>
                        </Link>
                    </li>

                    <li>
                        <Link href="" className="block hover:scale-110">
                        <Image alt="youtube" src="/youtube.svg"
                        width={50}
                        height={50}/>
                        </Link>
                    </li>

                </ul>
            </div>
            <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-xl font-medium">Site Map</h1>
            <ul className="flex flex-col gap-1 [&>li]:hover:font-normal">

                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/category">
                    Category
                    </Link>
                </li>

            </ul>

            </div>

            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-xl font-medium">
                    Categorias
                </h1>
                <ul className="flex flex-col gap-1 [&>li]:hover:font-normal">
                {listCategoryObj.map(v => (

                    <li key={v.slug}>
                        <Link href={`/category/${v.slug}`}>
                        {v.name}
                        </Link>
                    </li>

                ))}
                </ul>
            </div>
            <Copyright/>
       
        </footer>

    )

}

const Copyright = async () => {
    "use cache: remote"
     return (
     <p className="absolute max-w-max w-8/10 bottom-3 left-5/10
        -translate-x-5/10 hyphens-auto wrap-break-word text-sm">
            © {new Date().getFullYear()} Slayer – Projeto de portfólio. Todos os direitos reservados.
    </p>
     )

}

export default Footer