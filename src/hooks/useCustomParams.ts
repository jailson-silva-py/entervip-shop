"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const useCustomParams = () => { 

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const pathname = usePathname()
    const router = useRouter()

    const update = () => {

        router.replace(pathname+'?'+params.toString(), {scroll:false})

    }

    return {update, searchParams, params, pathname, router}


}

export default useCustomParams