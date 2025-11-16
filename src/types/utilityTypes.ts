import { Prisma } from "@prisma/client"


export type ProductForCard =   Prisma.ProductGetPayload<{
  include: {
    images: true
    variants: { include: { price: true } }
  }
}>
