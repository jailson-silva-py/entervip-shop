import { ProductFullForPage } from "@/types/utilityTypes"
import Comment from "./Comment"

interface CommentsProps {

    product:ProductFullForPage

}

const Comments = ({product}:CommentsProps) => {
    

    return (
    <div>
    <h1 className="my-4 font-medium text-xl">
        Comentários: {`(${product.reviews.length})`}
    </h1>
    {product.reviews.length === 0 ? 
    <h1 className="font-normal text-2xl mx-auto">
        Não há nenhum comentário associado ao produto...
    </h1>
    :
    <article className="flex flex-col gap-2 shadow-comment
    shadow-shadow">
        
        {product.reviews.map(review => (

           <Comment review={review}/>

        ))}

    </article>}
    </div>
    )

}

export default Comments