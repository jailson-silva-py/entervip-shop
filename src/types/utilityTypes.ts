import { findUserById } from "@/actions";
import { Prisma } from "@/generated/prisma/browser";
import { PromiseReturnType } from "@prisma/client/extension";

export type User = PromiseReturnType<typeof findUserById>

export type ProductForCard =   {
    name: string;
    images: {
        id: string;
        productId: string;
        url: string;
        alt: string | null;
        position: number;
    }[];
    slug: string;
    variants: {
        id:string,
        price: {
            variantId: string;
            currency: string;
            amount: string;
            compareAt: string | null;
            effectiveFrom: Date;
        } | null;
    }[];
  }

export type ProductFullForPage = {
    images: {
        id: string;
        productId: string;
        url: string;
        alt: string | null;
        position: number;
    }[];
    variants: {
        id:string,
        price: {
            variantId: string;
            currency: string;
            amount: string;
            compareAt: string | null;
            effectiveFrom: Date;
        } | null;
    }[];
    name: string;
    slug: string;
    description: string | null;
    reviews: {
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
        rating: number;
        title: string | null;
        body: string | null;
    }[];
    brand: {
        name: string;
        id: string;
        slug: string;
    } | null;
}

export type CartItemForCart = Prisma.CartItemGetPayload<{
  
        include:{
            cart:true,
            variant:{
                select:{
                    productId:true,
                    id:true,
                    inventory:{
                        select:{
                            reserved:true, quantity:true
                        }
                    },
                    price:{
                        select:{
                            amount:true, currency:true
                        }
                    }, product:{
                        select:{
                            name:true,
                            images:{
                                select:{
                                    url:true
                                }
                            }
                        }
                    }
                }
            }
        },
}>

export type CartItemsForCart =  CartItemForCart[]


export type searchParams = Promise<{[key:string]: string | string[] | undefined}>
