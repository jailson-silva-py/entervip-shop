"use client";
import { ComponentProps, ReactNode } from 'react';
import { useFormStatus } from 'react-dom'
import { TbLoader } from 'react-icons/tb';

type Iprops = {

    children:ReactNode,
    size?:number,

} & ComponentProps<'button'>

const BtnWithLoading:React.FC<Iprops> = ({children, size=32, ...props}) => {

    const {pending} = useFormStatus()
    
    return (
    <button {...props}>
        {pending ? <TbLoader size={size} className="animate-spin"/>: children}
    </button>
    )

}

export default BtnWithLoading