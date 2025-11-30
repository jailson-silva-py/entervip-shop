"use client";
import { ToastProps } from "@/types/utilityTypes";
import { createContext, useState } from "react";

type ContextType = [ToastProps | null,
React.Dispatch<React.SetStateAction<ToastProps | null>>]
const initialContext:ContextType = [{type:'info', msg:'', id:''}, () => {}]

export const ToastContext = createContext<ContextType>(initialContext)

export const ToastProvider = ({children}:{children:React.ReactNode}) => {

    const [toastObj, setToastObj] = useState<ToastProps | null>(null)

    return (

        <ToastContext.Provider value={[toastObj, setToastObj]}>
            {children}
        </ToastContext.Provider>

    )

}