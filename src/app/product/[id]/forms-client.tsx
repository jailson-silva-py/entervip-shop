"use client";
import { addProductToCart } from "@/actions"
import { BtnAction } from "@/components/BtnAction"
import { ToastContext } from "@/contexts/ToastContext"
import { ProductFullForPage } from "@/types/utilityTypes"
import { FormEvent, use } from "react"

type AddToCartFormProps = {

    product:ProductFullForPage,
    userId:string,
    cartId:string | undefined

}

export const AddToCartForm = ({userId, cartId, product}:AddToCartFormProps) => {

    const [, setToastObj] = use(ToastContext)

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        (async () => {

            const toast = await addProductToCart(userId,
            cartId as string, product.variants[0]?.id)
            
            setToastObj(toast)
            
        })()

    }

    return (
    <form onSubmit={handleSubmit}>
        <BtnAction text="Adicionar ao carrinho" 
        variantBtn="grad-gold-gold-aph"/>
    </form>
    )

}

export const BuyProductForm = () => {

    const [, setToastObj] = use(ToastContext)

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        (async () => {

            
            
        })()

    }

    return (

        
        <form onSubmit={handleSubmit}>

        <BtnAction text="Comprar" variantBtn="grad-fg-fg-aph"/>

        </form>
        

    )


}