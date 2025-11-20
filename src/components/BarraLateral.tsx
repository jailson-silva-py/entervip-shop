"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { onlyNumbers } from "@/utils/validators"
import Link from "next/link"
import useCustomParams from "@/hooks/useCustomParams"
import { TbChevronRight, TbStar } from "react-icons/tb"
import { getBrandsForCategory, getBrandsForCategoryClient } from "@/actions"


const FillStar =  <TbStar size={16} className="fill-fg"/>

const DefaultStar =  <TbStar size={16}/>
       

const FilterBar = () => {

    const [price, setPrice] = useState({min:'', max:'', errorMsg:''})
    const { pathname, params, update} = useCustomParams()
    const [brands, setBrands] = useState<null | {
        id:string,
        name:string,
        slug:string}[] | null>(null)
    
    console.log(brands)
    
    useEffect(() => {

        (async () => {

            const b = await getBrandsForCategoryClient("a")
            setBrands(b)
        })()

    }, [])
    

    const validatorMinPrice = (e:ChangeEvent<HTMLInputElement>) => {

        const newValor = onlyNumbers(e.target.value)
        setPrice(prev => ({...prev, min:newValor||'', errorMsg:''}))

    }

    const validatorMaxPrice = (e:ChangeEvent<HTMLInputElement>) => {

        const newValor = onlyNumbers(e.target.value)
        setPrice(prev => ({...prev, max:newValor||'', errorMsg:''}))

    }

    const getUrlSearch = (name:string, value:string) => {

        params.set(name, value)
        return `${pathname}?${params.toString()}`

    }

    const handleBtnEnterPrice = () => {

        const min = parseInt(price.min)
        const max = parseInt(price.max)
        console.log(min, max)
        console.log(max < min)
        if (max < min) {

            setPrice(prev => ({...prev, errorMsg:'O preço mínimo é maior que o máximo.'}))
            return
        }
        params.set('min-value', price.min)
        params.set('max-value', price.max)
        update()

    }

    return (

        <aside className="px-4 py-8 flex flex-col gap-2 w-75
        min-h-screen tracking-widest font-light border-r border-shadow">

            {brands && <div className="w-full">

                <h1 className="text-xl font-normal my-2">
                    Marcas
                </h1>
                <ul className="flex flex-col p-2 gap-2">
                    {brands.map(brand => (

                    <li key={brand.id}>
                        <Link href={getUrlSearch('brand', 
                        brand.slug)}
                        className="hover:font-normal">
                        {brand.name}
                        </Link>
                    </li>

                    ))}
                    

                </ul>

            </div>}

            <div className="w-full">
            <h1 className="text-xl font-normal my-2">Preços</h1>
            <div className="flex gap-2 items-center">
            <label className="block w-1/3">
            
            <input type="text" className="h-6 w-full px-2 py-2
            rounded-sm outline-none shadow-default text-sm
            shadow-shadow focus:shadow-fg"
            placeholder="Mínimo"
            name="min-price" onChange={validatorMinPrice} value={price.min}/>
            </label>
            <div className="h-px w-1.5 bg-text"/>
            <label className="block w-1/3">
            
            <input type="text" className="h-6 w-full px-2 py-2
            rounded-sm outline-none shadow-default text-sm
            shadow-shadow focus:focus:shadow-fg"
            placeholder="Máximo"
            name="max-price" onChange={validatorMaxPrice} value={price.max}/>
            </label>
            
            <button className="flex items-center justify-center
            rounded-full w-7 h-7 bg-fg-aph cursor-pointer
            disabled:opacity-35 hover:scale-115"
            disabled={Boolean(price.errorMsg) || Boolean(!price.min || !price.max)}
            onClick={handleBtnEnterPrice}>
                <TbChevronRight size={24}/>
            </button>

            </div>
           {price.errorMsg && 
           <p className="validator-text">* {price.errorMsg}</p>}
            </div>

            <div className="w-full">
                <h1 className="text-xl font-normal my-2">
                    Classificações
                </h1>
                <ul>

                    {Array.from({length:5}, (_, k) => 
                        (<li key={k}>
                        <Link href={getUrlSearch('classification', String(k+1))} 
                        className="flex gap-1 items-center w-max group">
                        <div className="flex [&>svg]:stroke-[0.5]
                        [&>svg]:group-hover:stroke-1">
                        {Array.from({length:k+1}, () => (

                            FillStar

                        ))}

                        {Array.from({length:5-(k+1)}, () => (

                            DefaultStar

                        ))}
                        
                        </div>

                        <h3 className="text-sm group-hover:font-normal">
                            Até {k+1}
                        </h3>
                        </Link>
                        
                    </li>))}
                    

                </ul>
            </div>
            
        
        </aside>

    )

}

export default FilterBar