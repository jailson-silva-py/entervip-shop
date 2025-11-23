import { makeSlug } from "./slugUtil"

const listCategory = [
         'Brinquedos', 'Cozinha', 'Acessórios', 'Beleza',
         'Eletrônicos', 'Moda', 'Esporte & Fitness',
         'Papelaria & Escritório', 'Pet Shop', 'Automotivo',
         'Móveis', 'Jardim & Varanda',
]


export const listCategoryObj = listCategory.map(v => (
    {name:v, slug:makeSlug(v)}))