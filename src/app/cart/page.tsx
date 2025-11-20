import { filterProducts } from "@/actions"
import FilterBar from "@/components/BarraLateral"

interface Iprops {

    searchParams:Promise<{[key:string]:string | undefined}>

}

const Cart = async ({searchParams}:Iprops) => {
    
    const filter = await searchParams
    const products = await filterProducts(filter.brand,
        filter.classification, {min:filter['min-value'],
            max:filter['max-value']})

    console.log(products)
    console.log(filter['max-value'], filter['min-value'])
    return (
        
       <FilterBar/>
       

    )

}

export default Cart