import { deleteProductCart, getCartItemsByUserId, getFullPricesCartItems, updateQtyCartItem} from "@/actions"
import { getFullPrice } from "@/utils/getValues"
import Image from "next/image"
import { BtnDelete, InputQuantidade } from "./cart-ux"
import { CartItemForCart } from "@/types/utilityTypes"
import Link from "next/link"

const CartItem = async ({cartItem}:{cartItem:CartItemForCart}) => {

    const price = cartItem.variant?.price
    const variant = cartItem.variant
    const inventory = cartItem.variant?.inventory
    const qtyAvaliable = (inventory?.quantity || 0)-(inventory?.reserved || 0)
    const fullPriceItem = (parseFloat(price?.amount.toString() || "0") * cartItem.qty).toFixed(2)
    return (
        <>
        <li className="grid grid-cols-[50px_50px_auto_125px_125px] gap-4 py-4">
        <form action={async () => {
            "use server";

            await deleteProductCart(cartItem.cart.userId,
                cartItem.cartId, cartItem.id)
            

        }}
        className="bg-bg-accent
        justify-center rounded-sm p-1 h-12.5 w-12.5 shadow-default
        shadow-shadow hover:brightness-95">
        <BtnDelete/>
        </form>
        <Image alt="image-product" width={50} height={50}
          src={variant?.product?.images[0]?.url || '/not-found.png'}/>
        <span 
        className="line-clamp-1 font-medium text-ellipsis">
            <Link href={`/product/${cartItem.variant.productId}`}
            className="hover:underline">
            {variant.product.name}
            </Link>
        </span>

        <div className="font-semibold text-2xl ">
            <form action={async (formData:FormData) => {
                "use server";
                const quantidade = parseInt(formData.get('qty') as string)
                await updateQtyCartItem(cartItem, quantidade)

            }} className="flex">
                <InputQuantidade qty={cartItem.qty}
                qtyAvaliable={qtyAvaliable}/>
                
            </form>
            <div className="mx-auto my-2 font-normal text-xs">
                {qtyAvaliable > 999?"+999":qtyAvaliable} disponíveis
            </div>
        </div>

        {<p className="flex gap-2">
            <span className="text-sm font-medium">
                {price?.currency}
            </span>
            <span className="font-semibold text-xl">
            {fullPriceItem}
            </span>
        </p>}
        </li>
        <hr className="opacity-20 pl-[-10vw]"/>
        </>
    )

}

const Cart = async () => {
    
    const cartItems = await getCartItemsByUserId(1, 10)
    const fullPriceArray = await getFullPricesCartItems(cartItems[0]?.cartId,
        cartItems[0]?.cart.userId)
    console.log(Array.isArray(fullPriceArray)&& cartItems.length)
    const fullPrice = Array.isArray(fullPriceArray) && cartItems.length ? getFullPrice(fullPriceArray): 0
    
    return(
    <div className="w-full px-[10vw] py-16 flex flex-row gap-8 
    tracking-widest font-light">

        <div className="p-4 flex-3 bg-bg-accent rounded-sm shadow-xs shadow-shadow">
            <h2 className="my-2 text-xl font-medium">
            Produtos
            </h2>
            <hr className="opacity-20"/>
            {cartItems.length > 0 ?
            <ul>

            {cartItems.map((cartItem, i) => (
                
                <CartItem key={cartItem.id+i}
                cartItem={cartItem}/>
                
            ))}

            </ul>:
            <p className="my-4">Nenhum produto foi adicionado ao carrinho.</p>}
        </div>
        <div className="flex-1 p-8 bg-bg-accent flex flex-col gap-4 shadow-xs rounded-sm shadow-shadow">
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