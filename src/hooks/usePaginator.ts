import { useEffect, useState } from "react"
import useCustomParams from "./useCustomParams"

const usePaginator = (maxPages:number, key:string) => {

    const [page, setPage] = useState({page:1, skip:0})
    const {params, update, pathname, searchParams} = useCustomParams()
    const identifier = key+'-page'

    const nextPage = () => {

        page.page < maxPages && setPage(prev => ({...prev, page:prev.page+1}))


    }

    useEffect(() => {

        if(!searchParams.get(identifier)) return
        const searchPage = parseInt(searchParams.get(identifier) || '1')
       
        if (searchPage <= maxPages && searchPage >= 1) {

            setPage(prev => ({...prev, page:searchPage}))

        }


    }, [searchParams.get(identifier)])

    useEffect(() => {

        if (page.page > 4) {

            setPage(prev => 
                ({...prev, skip:prev.skip+page.page, page:1}))

        }

        params.set(identifier, String(page.page+page.skip))
        update()

    }, [page])

    const previousPage = () => {

        page.page > 1  && setPage(prev => ({...prev, page:prev.page-1}))

    }



    return {previousPage, nextPage, page, pathname}

}

export default usePaginator