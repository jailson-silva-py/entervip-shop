"use client"
import { ToastContext } from "@/contexts/ToastContext"
import { typesToast } from "@/types/utilityTypes"
import { use, useEffect } from "react"
import { IconType } from "react-icons"
import { HiOutlineX } from "react-icons/hi"
import { HiOutlineCheckCircle, HiOutlineInformationCircle, HiOutlineXCircle } from "react-icons/hi2"


const Icons = {

    info:HiOutlineInformationCircle,
    error:HiOutlineXCircle,
    success:HiOutlineCheckCircle

} satisfies Record<typesToast, IconType>

const colors = {

    info:{bg:'bg-info', text:'text-info'},
    error:{bg:'bg-error', text:'text-error'},
    success:{bg:'bg-success', text:'text-success'}

} satisfies Record<typesToast, {text:string, bg:string}>

const Toast = () => {

    const [toastObj, setToastObj] = use(ToastContext)
    const Icon = toastObj && Icons[toastObj?.type]
    

    const handleClose = () => {

        setToastObj(null)

    }


    useEffect(() => {

        if (!toastObj) return
        const fecharToast = () => setToastObj(null)
        const id = setTimeout(fecharToast, 5000)

        return () => clearTimeout(id)

    }, [toastObj, setToastObj])

  
    return (
    <>
    {toastObj &&
    <div className="fixed z-100 bottom-3 left-2 h-15 py-1 min-w-75 w-[30vw] bg-bg-2
     shadow-double-dxs shadow-shadow rounded-sm animate-show-to-bottom" key={toastObj?.id}>

        <div className={`absolute -z-1 bottom-0 left-0 w-full
            h-1 ${colors[toastObj.type].bg} animate-timing-toast`}/>
        <div className="w-full h-full px-4 flex gap-2
        overflow-hidden bg-bg-2">
        
        <div className="flex-4 h-full flex gap-2 items-center
        justify-center">
        <div className="bg-bg-2">
        {Icon && <Icon className={`${colors[toastObj.type].text} size-[max(1.5vw,24px)]`} size={24}/>}
        </div>
        <p className="flex-7 text-[max(var(--text-xs),1vw)] line-clamp-2">
           {toastObj.msg}
        </p>
        </div>

        <button className="bg-bg-2 hover:brightness-95 flex cursor-pointer
        justify-center items-center h-max my-auto rounded-sm p-0.5"
        onClick={handleClose}>
            <HiOutlineX size={24} className="text-text size-[max(1.5vw, 24px)]"/>
        </button>

        
        </div>
    </div>}
    </>

    )

}

export default Toast