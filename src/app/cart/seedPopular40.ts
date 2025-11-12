// Seed: cria categoria "Popular", cria 40 produtos inéditos e relaciona todos à Popular.
import { prisma } from 'prisma'
import { ProductStatus } from '@prisma/client'
import crypto from 'crypto'
import { makeSlug } from '@/utils/slugUtil'


type SeedItem = {
  name: string
  description: string
  status: ProductStatus
  searchText: string
  brandName: string
}

const items: SeedItem[] = [
  // Brand: Aurora Labs
  { name: 'Soundbar Orion S300', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'soundbar orion s300 aurora labs popular', brandName: 'Aurora Labs' },
  // Brand: HelixWorks
  { name: 'Headset Arc Zero', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'headset arc zero helixworks popular', brandName: 'HelixWorks' },
  // Brand: Vortex & Co
  { name: 'Teclado Mecânico Nebula TKL', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'teclado mecânico nebula tkl vortex & co popular', brandName: 'Vortex & Co' },
  // Brand: Urbania Studio
  { name: 'Mouse Wireless Photon X', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'mouse wireless photon x urbania studio popular', brandName: 'Urbania Studio' },
  // Brand: Flux Systems
  { name: 'Monitor UltraWide Vega 34', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'monitor ultrawide vega 34 flux systems popular', brandName: 'Flux Systems' },
  // Brand: Pulse Gear
  { name: 'SSD Portátil Flux 2TB', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'ssd portátil flux 2tb pulse gear popular', brandName: 'Pulse Gear' },
  // Brand: Nimbus Forge
  { name: 'Webcam Crystal 4K', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'webcam crystal 4k nimbus forge popular', brandName: 'Nimbus Forge' },
  // Brand: Voyager Tech
  { name: 'Hub USB-C Matrix 9-em-1', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'hub usb-c matrix 9-em-1 voyager tech popular', brandName: 'Voyager Tech' },
  // Brand: Aurora Labs
  { name: 'Carregador GaN Duo 100W', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'carregador gan duo 100w aurora labs popular', brandName: 'Aurora Labs' },
  // Brand: HelixWorks
  { name: 'Caixa de Som Pulse Mini', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'caixa de som pulse mini helixworks popular', brandName: 'HelixWorks' },
  // Brand: Vortex & Co
  { name: 'Smartwatch Atlas Runner', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'smartwatch atlas runner vortex & co popular', brandName: 'Vortex & Co' },
  // Brand: Urbania Studio
  { name: 'Lampada Smart Halo A60', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'lampada smart halo a60 urbania studio popular', brandName: 'Urbania Studio' },
  // Brand: Flux Systems
  { name: 'Fone In-Ear Nova Pro', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'fone in-ear nova pro flux systems popular', brandName: 'Flux Systems' },
  // Brand: Pulse Gear
  { name: 'Cafeteira Espresso Core 19bar', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'cafeteira espresso core 19bar pulse gear popular', brandName: 'Pulse Gear' },
  // Brand: Nimbus Forge
  { name: 'Air Fryer Aero Crisp 5L', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'air fryer aero crisp 5l nimbus forge popular', brandName: 'Nimbus Forge' },
  // Brand: Voyager Tech
  { name: 'Liquidificador Vortex 1200', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'liquidificador vortex 1200 voyager tech popular', brandName: 'Voyager Tech' },
  // Brand: Aurora Labs
  { name: 'Panela de Pressão Prime One', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'panela de pressão prime one aurora labs popular', brandName: 'Aurora Labs' },
  // Brand: HelixWorks
  { name: 'Garrafa Termica Boreal 1L', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'garrafa termica boreal 1l helixworks popular', brandName: 'HelixWorks' },
  // Brand: Vortex & Co
  { name: 'Luminaria Desk Luma Pro', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'luminaria desk luma pro vortex & co popular', brandName: 'Vortex & Co' },
  // Brand: Urbania Studio
  { name: 'Ventilador Silent Breeze 40', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'ventilador silent breeze 40 urbania studio popular', brandName: 'Urbania Studio' },
  // Brand: Flux Systems
  { name: 'Cadeira Gamer Drift RX', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'cadeira gamer drift rx flux systems popular', brandName: 'Flux Systems' },
  // Brand: Pulse Gear
  { name: 'Mesa Lateral Urban Edge', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'mesa lateral urban edge pulse gear popular', brandName: 'Pulse Gear' },
  // Brand: Nimbus Forge
  { name: 'Prateleira Modular Minimal', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'prateleira modular minimal nimbus forge popular', brandName: 'Nimbus Forge' },
  // Brand: Voyager Tech
  { name: 'Aparador Nordic Line', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'aparador nordic line voyager tech popular', brandName: 'Voyager Tech' },
  // Brand: Aurora Labs
  { name: 'Cadeira Escritório ErgoFlex', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'cadeira escritório ergoflex aurora labs popular', brandName: 'Aurora Labs' },
  // Brand: HelixWorks
  { name: 'Rack Painel Vision 60', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'rack painel vision 60 helixworks popular', brandName: 'HelixWorks' },
  // Brand: Vortex & Co
  { name: 'Tapete Yoga Balance Mat', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'tapete yoga balance mat vortex & co popular', brandName: 'Vortex & Co' },
  // Brand: Urbania Studio
  { name: 'Halter Hex 10kg', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'halter hex 10kg urbania studio popular', brandName: 'Urbania Studio' },
  // Brand: Flux Systems
  { name: 'Kettlebell Core 16kg', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'kettlebell core 16kg flux systems popular', brandName: 'Flux Systems' },
  // Brand: Pulse Gear
  { name: 'Squeeze Steel 950', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'squeeze steel 950 pulse gear popular', brandName: 'Pulse Gear' },
  // Brand: Nimbus Forge
  { name: 'Mochila Urban 25L Shield', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'mochila urban 25l shield nimbus forge popular', brandName: 'Nimbus Forge' },
  // Brand: Voyager Tech
  { name: 'Carteira Slim Couro Wave', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'carteira slim couro wave voyager tech popular', brandName: 'Voyager Tech' },
  // Brand: Aurora Labs
  { name: 'Oculos Solar Spectra', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'oculos solar spectra aurora labs popular', brandName: 'Aurora Labs' },
  // Brand: HelixWorks
  { name: 'Jaqueta Tech Windbreaker', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'jaqueta tech windbreaker helixworks popular', brandName: 'HelixWorks' },
  // Brand: Vortex & Co
  { name: 'Tenis Trail Grip', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'tenis trail grip vortex & co popular', brandName: 'Vortex & Co' },
  // Brand: Urbania Studio
  { name: 'Shorts Runner Dry', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'shorts runner dry urbania studio popular', brandName: 'Urbania Studio' },
  // Brand: Flux Systems
  { name: 'Coleira Pet Comfort', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'coleira pet comfort flux systems popular', brandName: 'Flux Systems' },
  // Brand: Pulse Gear
  { name: 'Cama Pet Cloud', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'cama pet cloud pulse gear popular', brandName: 'Pulse Gear' },
  // Brand: Nimbus Forge
  { name: 'Aromatizante Auto FreshRide', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'aromatizante auto freshride nimbus forge popular', brandName: 'Nimbus Forge' },
  // Brand: Voyager Tech
  { name: 'Lampada LED Auto H7 Prime', description: 'Desempenho consistente no dia a dia. Construção durável e fácil de usar.', status: ProductStatus.ACTIVE, searchText: 'lampada led auto h7 prime voyager tech popular', brandName: 'Voyager Tech' }
]

export async function seedPopular40() {
  const popular = await prisma.category.upsert({
    where: { slug: 'popular' },
    update: { name: 'Popular', path: '/popular/' },
    create: { name: 'Popular', slug: 'popular', path: '/popular/' },
    select: { id: true },
  })

  const brandNames = Array.from(new Set(items.map(i => i.brandName)))
  await Promise.all(brandNames.map(name =>
    prisma.brand.upsert({
      where: { slug: makeSlug(name) },
      create: { name, slug: makeSlug(name) },
      update: { name },
    })
  ))
  const brandRows = await prisma.brand.findMany({ where: { slug: { in: brandNames.map(sl => makeSlug(sl)) } }, select: { id: true, name: true } })
  const brandIdByName: Record<string,string> = Object.fromEntries(brandRows.map(b => [b.name, b.id]))

  const data = items.map((p) => ({
    slug: `${makeSlug(p.name)}-${crypto.randomUUID().slice(0,6)}`,
    name: p.name,
    description: p.description,
    status: p.status,
    searchText: p.searchText,
    brandId: brandIdByName[p.brandName] ?? null,
  }))

  await prisma.product.createMany({ data})

  const created = await prisma.product.findMany({ where: { name: { in: items.map(i => i.name) } }, select: { id: true } })

  await prisma.productCategory.createMany({
    data: created.map(p => ({ productId: p.id, categoryId: popular.id })),
    
  })

  return { created: created.length, linked: created.length, categoryId: popular.id }
}
