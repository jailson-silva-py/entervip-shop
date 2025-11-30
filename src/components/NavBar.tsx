import { TbLoader, TbSearch, TbShoppingCart } from "react-icons/tb"
import ItemExpandable from "./ItemExpandable"
import Link from "next/link"
import Image from "next/image"
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown"
import { Suspense } from "react"
import { listCategoryObj } from "@/utils/listCategory"
import { countCartItemsByUserId } from "@/actions"
import { Loading } from "./ProfileDropdown/LoadingProfile"


const NavBar = async () => {

    return (
        <nav 
        className="p-4 w-full bg-fg h-24 relative
        flex flex-col gap-2 justify-center md:px-[10vw] font-light">

            <ul
            className="w-full flex-1 flex gap-1
            items-center justify-center text-sm">

            <li className="max-sm:hidden flex-2">
            <Link href="/">
            <Image alt="Logo" src="/logo.png" className="drop-shadow-sm drop-shadow-shadow"
            width={50} height={50} priority loading="eager"/></Link>
            </li>
            <li className="md:flex-4 flex-5">
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

            <li  className="flex ml-auto flex-none justify-end ">
                <Suspense fallback={<Loading/>}>
                <ProfileDropdown/>
                </Suspense>
                
                
            </li>
            <li className="flex-none mx-2 max-sm:hidden">
                <Suspense fallback={<CartLinkLoader/>}>
                <CartLink/>
                </Suspense>
            </li>

            </ul>
            <ul className="sm:relative mx-auto w-9/10 flex-1 flex gap-4
            text-sm items-end justify-center sm:w-4/10">

               
                                                                                                                                                                                                                                
                <ItemExpandable name="Categorias"
                listCategory={listCategoryObj}/>


                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Moda
                </li>
                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Eletrônicos
                </li>
                <li className="text-center cursor-pointer flex-1
                min-w-[60px] hover:font-normal">
                    Beleza
                </li>

            </ul>

        </nav>
      
    )

}

const CartLink = async () => {

    const cartItems = await countCartItemsByUserId()

    return (
  
    <Link href="/cart" title="Ver carrinho"
        className="relative flex items-center justify-center
        ml-auto p-1 rounded-sm w-max h-full cursor-pointer">
                
        <TbShoppingCart size={32} 
        className="text-text stroke-[0.5] hover:stroke-[1.5]"/>
        { cartItems  &&
        <div className="p-1 rounded-full h-5  min-w-5 font-normal
        bg-text text-bg absolute top-0 -translate-y-2/10 -right-3
        flex items-center justify-center">
            {cartItems > 99 ? "99+":cartItems}
        </div>  }
    </Link>
    
    )
}

const CartLinkLoader = () => {


    return (
    <div className="relative flex items-center justify-center
        ml-auto p-1 rounded-sm w-max h-full cursor-pointer">
            <TbShoppingCart size={32} 
        className="text-text"/>
    <div className="p-1 rounded-full h-5  min-w-5 font-normal
     bg-text text-bg absolute top-0 -translate-y-2/10 -right-3
    flex items-center justify-center">
    <TbLoader size={12} className="animate-spin text-bg"/>
    </div>
    </div>
    )
}

export default NavBar