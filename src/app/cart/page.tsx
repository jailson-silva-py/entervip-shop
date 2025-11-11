import {prisma} from 'prisma'
import slugify from 'slugify'
import { products } from './products_seed'

const makeSlug = (s:string) => {

    const newS = slugify(s , {lower:true, strict:true, trim:true})
    return newS
}

const handleCreations = async () => {

    // const categorias = [
    //     'Brinquedos', 'Cozinha', 'Acessórios', 'Beleza',
    //     'Eletrônicos', 'Moda', 'Esporte & Fitness',
    //     'Papelaria & Escritório', 'Pet Shop', 'Automotivo',
    //     'Móveis', 'Jardim & Varanda',
    // ]

    // var productsCreated = []
    // var productCategory = []

    // for (let product of products) {
        
    //     const initialSlug = makeSlug(product.name)
    //     const slug = initialSlug + crypto.randomUUID().substring(0, 6)

    //     const data = await prisma.product.create({

    //         data:{...product, slug}

    //     })

    //     productsCreated.push(data)

    // }

    // for (let [count, categoria] of categorias.entries()) {

    //     const data = await prisma.category.create({

    //     data:{name:categoria, slug:makeSlug(categoria)}

    //     })
        
    //     const subproducts = productsCreated.slice(count*20, (count+1)*20)

    //     for (const p of subproducts) {

    //         productCategory.push({productId:p.id, 
    //             categoryId:data.id})   


    //     }

    // }

    // await prisma.productCategory.createMany({

    //     data:productCategory

    // })
    
    for (let product of products) {

        const data = await prisma.product.findMany({

            where:{name:product.name, searchText:product.searchText}

        })

        if(data.length > 1) {

            await prisma.product.delete({

                where:{...data[1]}

            })

        }

    }

        

}
    

const Cart = async () => {
    
    const count = await prisma.product.count()
    console.log(count)
    return (

       <></>

    )

}

export default Cart