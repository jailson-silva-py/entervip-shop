import { deleteProductCart, getCartItemsByUserId, getFullPricesCartItems, updateQtyCartItem} from "@/actions"
import { getFullPrice } from "@/utils/getValues"
import Image from "next/image"
import { BtnDelete, FormUpdateQty, InputQuantidade, PaginatorCart } from "./cart-ux"
import { CartItemForCart, searchParams } from "@/types/utilityTypes"
import Link from "next/link"

const CartItem = async ({cartItem}:{cartItem:CartItemForCart}) => {

    const price = cartItem.variant?.price
    const variant = cartItem.variant
    const inventory = cartItem.variant?.inventory
    const qtyAvaliable = (inventory?.quantity || 0)-(inventory?.reserved || 0)
    const fullPriceItem = (parseFloat(price?.amount.toString() || "0") * cartItem.qty).toFixed(2)
    return (
        <>
        <li className="relative grid max-md:grid-cols-[50px_auto_100px]
        grid-rows-[25px_25px] grid-cols-[50px_50px_auto_125px_125px] gap-x-4 max-md:gap-x-2 py-6">
        
        <BtnDelete cartItem={cartItem}/>
    
        <Image alt="image-product" width={50} height={50}
          src={variant?.product?.images[0]?.url || '/not-found.png'}/>
        <span>
            <Link href={`/product/${cartItem.variant.productId}`}
            className="hover:underline line-clamp-1 font-medium
            text-ellipsis max-md:text-xs">
            {variant.product.name}
            </Link>
        </span>

        <div className="gap-2 font-semibold text-2xl h-max max-md:col-start-2 max-md:row-start-2">
            <FormUpdateQty cartItem={cartItem} qtyAvaliable={qtyAvaliable}/>
        </div>
        <p className="my-1.5 max-md:hidden max-md:absolute col-start-4
        row-start-2 max-md:text-[10px] font-normal text-xs">
            {qtyAvaliable > 999?"+999":qtyAvaliable} disponíveis
        </p>

        {<p className="flex gap-1 h-5">
            <span className="text-sm max-md:text-xs font-medium">
                {price?.currency}
            </span>
            <span className="font-semibold text-xl max-md:text-sm">
            {fullPriceItem}
            </span>
        </p>}
        </li>
        <hr className="opacity-20 pl-[-10vw]"/>
        </>
    )

}

const pageSize = 5

const Cart = async ({searchParams}:{searchParams:searchParams}) => {
    
    const filter = await searchParams
    const page = parseInt(filter['cart-page'] || '1')
    const cartItems = await getCartItemsByUserId(page, pageSize)
    const fullPriceArray = await getFullPricesCartItems(cartItems[0]?.cartId,
        cartItems[0]?.cart.userId)
    
    const fullPrice = Array.isArray(fullPriceArray) && cartItems.length ? getFullPrice(fullPriceArray): 0
    
    return(
    <div className="max-md:px-0 max-lg:flex-col  maxw-full px-[10vw] py-16 flex flex-row gap-8 
    tracking-widest font-light">

        <div className="p-4 flex-3 bg-bg-accent rounded-sm
        shadow-xs shadow-shadow">
            <h2 className="my-2 text-xl font-medium">
            Produtos
            </h2>
            <hr className="opacity-20"/>
            {cartItems.length > 0 ?
            <>
            <ul>

            {cartItems.map((cartItem, i) => (
                
                <CartItem key={cartItem.id+i}
                cartItem={cartItem}/>
                
            ))}

            </ul>
            <PaginatorCart pageSize={pageSize} countCartItems={fullPriceArray.length}/>
            </>:
            <p className="my-4">Nenhum produto foi adicionado ao carrinho.</p>}

        </div>
        <div className="h-max max-lg:-order-1 max-lg:w-full bottom-0 left-5/10 flex-1
        p-8 bg-bg-accent flex flex-col gap-4 shadow-xs rounded-sm
        shadow-shadow">
            <h1 className="font-medium">Resumo da compra</h1>
            <hr className="opacity-20"/>
            <p className="text-sm font-normal flex justify-between">
                <span>Produtos{`(${cartItems.length})`}</span>
                <span>{fullPrice}</span>
            </p>

            <p className="text-sm font-normal flex justify-between">
            <span>Frete</span>
            <span className="text-green-700 font-bold">
                Grátis
            </span>
            </p>

            <p className="text-xl font-medium flex justify-between">
                <span>Total</span>
                <div className="flex gap-2">
                    <span className="font-normal text-sm">
                        {cartItems[0]?.variant?.price?.currency ?? "BRL"}
                    </span>
                    <span>{fullPrice}</span>
                </div>
            </p>

            <button className="bg-linear-150 from-fg-aph
            to-fg font-medium p-2 rounded-sm cursor-pointer
            not-disabled:hover:brightness-95 disabled:opacity-60 " disabled={cartItems.length <= 0}>
                Continuar Compra
            </button>
        </div>

    </div>
    )

}

export default Cart