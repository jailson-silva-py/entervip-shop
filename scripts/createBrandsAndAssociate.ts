// scripts/seed-brands-and-products.ts
import { products } from '@/app/cart/products_seed'; // <-- ajusta o path
import { makeSlug } from '@/utils/slugUtil';
import {prisma} from 'prisma'
import { ProductStatus } from '@prisma/client';


/**
 * Marcas que JÁ estão no banco (as da imagem que você mandou).
 * O script nunca vai tentar criar essas.
 */
const EXISTING_BRAND_NAMES = new Set<string>([
  'HelixWorks',
  'Aurora Labs',
  'Urbania Studio',
  'Vortex & Co',
  'Flux Systems',
  'Pulse Gear',
  'Nimbus Forge',
  'Voyager Tech',
]);

/**
 * Categorias que aparecem no final do searchText
 * Ex: "Quebra-Cabeça Criativo 01 Atlas Brinquedos"
 */
const CATEGORY_SUFFIXES = [
  'Brinquedos',
  'Cozinha',
  'Acessórios',
  'Beleza',
  'Eletrônicos',
  'Moda',
  'Esporte & Fitness',
  'Papelaria & Escritório',
  'Pet Shop',
  'Automotivo',
  'Móveis',
  'Jardim & Varanda',
];

function extractBrandFromSearchText(searchText: string): string {
  for (const category of CATEGORY_SUFFIXES) {
    const suffix = ' ' + category;
    if (searchText.endsWith(suffix)) {
      const withoutCategory = searchText.slice(0, -suffix.length);
      const parts = withoutCategory.trim().split(' ');
      const brand = parts[parts.length - 1]; // última palavra antes da categoria
      return brand;
    }
  }

  throw new Error(`Não consegui extrair a marca de: "${searchText}"`);
}


async function seedBrands() {
  const brandNames = new Set<string>();

  for (const product of products) {
    const brand = extractBrandFromSearchText(product.searchText);
    // ignora marcas que já existem (as da imagem)
    if (!EXISTING_BRAND_NAMES.has(brand)) {
      brandNames.add(brand);
    }
  }

  // vê quais dessas já existem no banco (caso você já tenha rodado antes)
  const existing = await prisma.brand.findMany({
    where: {
      name: { in: Array.from(brandNames) },
    },
    select: { name: true },
  });

  const existingSet = new Set(existing.map((b) => b.name));

  for (const name of brandNames) {
    if (existingSet.has(name)) continue; // já existe no db

    const slug = makeSlug(name);

    await prisma.brand.create({
      data: {
        name,
        slug,
      },
    });

    console.log(`✅ Marca criada: ${name} (${slug})`);
  }
}

async function seedProducts() {
  for (const p of products) {
    const brandName = extractBrandFromSearchText(p.searchText);
    const brandSlug = makeSlug(brandName);

    const brand = await prisma.brand.findUnique({
      where: { slug: brandSlug },
      select: { id: true },
    });

    if (!brand) {
      // Se cair aqui, provavelmente é alguma marca que você quis ignorar
      console.warn(
        `⚠️ Marca "${brandName}" não encontrada, pulando produto "${p.name}".`
      );
      continue;
    }

    const productSlug = makeSlug(p.name);

    // upsert pra ficar idempotente (rodar o seed mais de uma vez sem quebrar)
    await prisma.product.upsert({
      where: { slug: productSlug },
      update: {
        description: p.description,
        status: p.status as ProductStatus,
        searchText: p.searchText,
        brandId: brand.id,
      },
      create: {
        slug: productSlug,
        name: p.name,
        description: p.description,
        status: p.status as ProductStatus,
        searchText: p.searchText,
        brandId: brand.id,
      },
    });

    console.log(`📦 Produto vinculado: "${p.name}" -> ${brandName}`);
  }
}

export async function main() {
  await seedBrands();
  await seedProducts();
}

