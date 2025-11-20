import { getAllCategories } from "@/actions"
import ProductsCategory from "@/components/ProductsCategory"
import { searchParams } from "@/types/utilityTypes"

const CategoriesPage = async ({searchParams}:{
    searchParams:searchParams
}) => {

    const categories = await getAllCategories()   
    return (
        <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-widest font-medium">
        Categorias
        </h1>
        <p className="text-sm font-normal font-widest">
            O melhor de todos os gêneros...
        </p>
        {categories.map(({slug, name}) => (

            <ProductsCategory slug={slug} pageSize={10}
            title={name} searchParams={searchParams}/>

        ))}
        </div>
    )

} 

export default CategoriesPage