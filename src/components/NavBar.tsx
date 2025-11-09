import { TbChevronDown, TbSearch, TbShoppingCart } from "react-icons/tb"
import ItemExpandable from "./ItemExpandable"
import Link from "next/link"
import Image from "next/image"

const listCategory = [

    <li>Brinquedos</li>,
    <li>Cozinha</li>,
    <li>Acessórios</li>,
    <li>Beleza</li>,
    <li>Eletrônicos</li>,
    <li>Moda</li>,

    <li>Brinquedos</li>,
    <li>Cozinha</li>,
    <li>Acessórios</li>,
    <li>Beleza</li>,
    <li>Eletrônicos</li>,
    <li>Moda</li>,


]
const NavBar = async () => {

    return (

        <nav 
        className="p-4 w-full bg-fg h-24
        flex flex-col gap-2 justify-center sm:px-40 font-light">

            <ul
            className="flex-1 flex gap-1
            items-center justify-center text-sm">

            <li className="flex-2">
            <Link href="/">
            <Image alt="Logo" src="/logo.png" className="drop-shadow-sm drop-shadow-shadow"
            width={50} height={50} priority/></Link>
            </li>
            <li className="flex-4">
            <form action="" className="w-full h-full">

                <div className="w-full h-full relative">

                <TbSearch size={18}
                className="absolute  translate-y-[-50%] top-1/2 left-2 text-text stroke-[0.5]"/>
                <div
                className="h-6/10 w-px bsolute translate-[-50%] top-1/2 left-[30px] bg-text"/>

                <input type="search" name="searchProduct"
                id="searchProduct" placeholder="Pesquise ..."
                className="no-clear bg-bg shadow-[0_0_0_1px] shadow-shadow 
                rounded-xl pl-10 py-2 tracking-wide outline-0 focus:shadow-[0_0_0_2px]
                h-full w-full text-text"/>

                </div>

            </form>
            </li>
            <li className="flex-1">
            <button className="flex items-center justify-center
            w-full h-full cursor-pointer ">

                <TbShoppingCart size={32} 
                className="text-text stroke-[0.5] no-clear"/>

            </button>
            </li>

            </ul>
            <ul className="mx-auto w-9/10 flex-1 flex gap-4
            text-sm items-end justify-center sm:w-4/10">

               

                <ItemExpandable name="Categorias"
                Icon={<TbChevronDown size={18} 
                className="text-text stroke-1 "/>}
                listCategory={listCategory}/>


                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Moda
                </li>
                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Eletronicos
                </li>
                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Beleza
                </li>

            </ul>

        </nav>

    )

}

export default NavBar