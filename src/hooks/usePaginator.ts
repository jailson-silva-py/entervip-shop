import { useEffect, useState } from "react"
import useCustomParams from "./useCustomParams"

const usePaginator = (maxPages:number, key:string) => {

    const [page, setPage] = useState(1)
    const {params, update} = useCustomParams()

    const nextPage = () => {

        page < maxPages && setPage(prev => ++prev)


    }

    useEffect(() => {

        params.set(key+'-page', String(page))
        update()

    }, [page])

    const previousPage = () => {

        page > 1  && setPage(prev => --prev)

    }



    return {previousPage, nextPage, page}

}

export default usePaginator