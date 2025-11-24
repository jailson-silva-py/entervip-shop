import { addProductToCart, getCartIdAndUserId, getProductById } from "@/actions"
import Comments from "@/components/Comments"
import ImagesProduct from "@/components/ImagesProduct"
import { BtnAction } from "@/components/BtnAction"

const ProductPage = async ({params}:{params:Promise<{id:string}>}) => {

    const { id } = await params
    const product = await getProductById(id, true)
    const price = product.variants[0].price
    const {userId, cartId} = await getCartIdAndUserId()
    
    return (
        <div className="mx-auto my-20 max-w-300 py-16 px-8 flex flex-col gap-4
        tracking-widest font-light bg-bg-accent">
        <div className=" w-full flex gap-16 p-4
        flex-row max-md:flex-col max-md:items-center h-full">
            <ImagesProduct product={product as any}/>
            <div className="flex flex-col gap-2 flex-2 max-w-5/10 max-md:max-w-9/10">
            <div className="w-full">
            <span className="text-fg font-semibold italic tracking-widest">
                {product.brand?.name}
            </span>
            <h1 className="text-3xl line-clamp-3 font-medium
            hyphens-auto wrap-break-word">
            {product.name}
            </h1>
            </div>

            <div>
            <h3 className="mt-2 text-base font-semibold">Resumo</h3>
            <p className="line-clamp-3 text-ellipsis font-normal">
                {product.description}
            </p>
            </div>
          
            <span className="text-4xl font-normal italic
            tracking-widest my-5">
                {price?.currency} {price?.amount}
            </span>
            

            <BtnAction text="Comprar" variantBtn="grad-fg-fg-aph"/>
            
            <form action={async () => {
                "use server"
            await addProductToCart(userId, cartId as string,
            product.variants[0]?.id)

            }}>
            <BtnAction text="Adicionar ao carrinho" 
            variantBtn="grad-gold-gold-aph"/>
            </form>

            </div>
            
        </div>
        <hr className="opacity-20"/>
        <div className="flex flex-col gap-4 my-2">
            <h3 className="font-medium text-xl">
                Descrição do produto:
            </h3>
            <p>{product.description}</p>

            

        </div>
        <hr className="opacity-20"/>
        <Comments product={product}/>

        </div>

    )


}

export default ProductPage