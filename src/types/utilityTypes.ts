import { Prisma } from "@prisma/client"


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


export type searchParams = Promise<{[key:string]: string | string[] | undefined}>
