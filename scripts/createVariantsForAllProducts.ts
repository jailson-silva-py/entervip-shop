import { prisma } from 'prisma'
import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import { makeSlug } from '@/utils/slugUtil'

/** slug -> SKU curto */
function skuFrom(slug: string) {
  const base = makeSlug(slug)
  return `${base}-${crypto.randomUUID().slice(0, 6)}`.toLocaleUpperCase()
}

/** preço aleatório “crível” (BRL) */
function randomPrice(min = 29.9, max = 1999.9) {
  const n = Math.random() * (max - min) + min
  return Number(n.toFixed(2))
}

/** compara-preço opcional (10–30% acima), às vezes ausente */
function maybeCompareAt(amount: number) {
  if (Math.random() < 0.5) return null
  const up = amount * (1 + (10 + Math.random() * 20) / 100)
  return Number(up.toFixed(2))
}

/** estoque aleatório */
function randomQty() {
  return Math.floor(Math.random() * 101) // 0..100
}

export async function seedOneVariantPerProduct() {
  return prisma.$transaction(async (tx) => {
    // 1) Produtos que AINDA não têm variante
    const products = await tx.product.findMany({
      where: { variants: { none: {} } },
      select: { id: true, slug: true, name: true },
    })
    if (products.length === 0) {
      return { createdVariants: 0, prices: 0, inventory: 0, note: 'Todos já tinham variantes.' }
    }

    // 2) Monta as variantes (1 por produto)
    const variantRows = products.map((p) => ({
      productId: p.id,
      sku: skuFrom(p.slug ?? p.name),
      attrs: {} as Prisma.InputJsonValue, // pode colocar {color:'default', size:'U'}
      isActive: true,
    }))

    // 3) Cria variantes em lote
    await tx.productVariant.createMany({
      data: variantRows,
    })

    // 4) Busca IDs das variantes recém-criadas pelos SKUs (createMany não retorna)
    const skus = variantRows.map((v) => v.sku)
    const createdVariants = await tx.productVariant.findMany({
      where: { sku: { in: skus } },
      select: { id: true, sku: true },
    })
    if (createdVariants.length === 0) {
      return { createdVariants: 0, prices: 0, inventory: 0, note: 'Nenhuma variante encontrada após createMany.' }
    }

    // 5) Preços e estoques (1:1 por variante)
    const priceRows = createdVariants.map((v) => {
      const amount = randomPrice()
      const compareAt = maybeCompareAt(amount)
      return {
        variantId: v.id,
        currency: 'BRL',
        amount,                 // Prisma Decimal aceita number/string
        compareAt: compareAt ?? undefined,
        // effectiveFrom: default now()
      }
    })

    const inventoryRows = createdVariants.map((v) => ({
      variantId: v.id,
      quantity: randomQty(),
      reserved: 0,
    }))

    await tx.price.createMany({ data: priceRows})
    await tx.inventory.createMany({ data: inventoryRows})

    return {
      createdVariants: createdVariants.length,
      prices: priceRows.length,
      inventory: inventoryRows.length,
    }
  })
}