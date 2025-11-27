import { useEffect, useState } from "react"
import useCustomParams from "./useCustomParams"

const usePaginator = (
maxPages:number, key:string, actionModParam?:() => void) => {

    const [page, setPage] = useState(1)
    const {params, update, pathname, searchParams} = useCustomParams()
    const identifier = key+'-page'

    const nextPage = () => {

        page < maxPages && setPage(prev => ++prev)


    }

    useEffect(() => {

        if(!searchParams.get(identifier)) return
        //O mínimo entre o máximo entre o valor e 1 e o maxPages
        const searchPage = Math.min(
            Math.max(parseInt(searchParams.get(identifier) || '1'), 1),
            maxPages)
     
   
        if (searchPage <= maxPages && searchPage >= 1) {

            setPage(searchPage)

        }

        actionModParam && actionModParam()

    }, [searchParams.get(identifier)])

    useEffect(() => {

        
        if(!(page >= 1 && page <= maxPages)) return

        params.set(identifier, String(page))
        update()

    }, [page])

    const previousPage = () => {

       page > 1  && setPage(prev => --prev)

    }

    const getLinkPage = (value:string | number) => {

        const hasId = searchParams.has(identifier)
        let addId = searchParams.toString() ? searchParams.toString()+`&${identifier}=${value}`:`${identifier}=${value}`
        
        if (hasId) {
            
            params.set(identifier, value.toString())
            addId = params.toString()

        }

        return `${pathname}?${addId}`

    }



    return {previousPage, getLinkPage, nextPage, page, pathname}

}

export default usePaginator