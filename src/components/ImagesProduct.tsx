"use client"

import Image from "next/image"
import { useState } from "react"
import { TbChevronCompactLeft, TbChevronCompactRight, TbX } from "react-icons/tb"

interface ImagesProductProps {

    product:{images:string[], name:string}

}

const ImagesProduct = ({product}:ImagesProductProps) => {
    const [index, setIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const prevImage = () => {

        if (index <= 0) return
        setIndex(prev => --prev)
    }

    const nextImage = () => {

        if (index >= product.images.length - 1) return 
        setIndex(prev => ++prev)

    }

    console.log(openModal)

    return (
    <>
    <div className="relative min-w-62 w-4/10 max-md:w-9/10 
    max-[460px]:h-85 h-125">

        <Image fill priority sizes="100%, 100%" src={
            product.images[index] || "/not-found.png"}
        alt={`product-${product?.name.toLocaleLowerCase().trim()}`}/>

        <div className="absolute top-2 left-2 flex flex-col gap-2 z-2">
            
            {Array.from({length:4}, (_, i) => (

            <button className={`w-max rounded-sm border-2 
            cursor-pointer ${!(index===i) && "hover:border-fg-aph"} 
            ${index === i?"border-fg":"border-shadow"}` }
            key={i} onClick={() => setIndex(i)}>
            <Image width={50} height={50} src={
            product.images[i] || "/not-found.png"}
            alt={`product-${product?.name.toLocaleLowerCase().trim()}`}/>
            </button>

            ))}
            
            {product &&
            <button className={`w-13.5 h-13.5 rounded-sm border-2
            cursor-pointer hover:border-fg-aph font-bold 
            ${index >= 4 ? "border-fg":"border-shadow"}`}
            onClick={() => {setIndex(4); setOpenModal(true)}}>
                +{product.images.length - 4}
            </button>}
            
            
            
        </div>


    </div>
    {openModal &&
    <div className="fixed flex inset-0
    w-screen h-screen backdrop-blur-sm border-2
    z-10 justify-center items-center">

        <button className="absolute p-2 right-5 top-2 
        rounded-full cursor-pointer hover:[&>svg]:scale-115"
        onClick={() => setOpenModal(false)}>
            <TbX size={32}/>
        </button>
        <div className="relative w-[calc((100vh+100vw)/4)] h-[calc((100vh+100vw)/4)]
        min-h-60 min-w-60">

        <Image alt={`product-image-${index}`}
        src={product.images[index] || "/not-found.png"} fill
        priority sizes="100%, 100%"/>

        </div>
    

    <button className="absolute p-2 left-0 top-5/10 -translate-y-full
    rounded-full cursor-pointer hover:bg-bg-2"
    onClick={prevImage}>
        <TbChevronCompactLeft size={32}/>
    </button>
    <button className="absolute p-2 right-0 top-5/10 -translate-y-full
    rounded-full cursor-pointer hover:bg-bg-2"
    onClick={nextImage}>
        <TbChevronCompactRight size={32}/>
    </button>
    </div>}
    </>
    )

}

export default ImagesProduct