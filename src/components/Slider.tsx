"use client"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TbChevronCompactLeft, TbChevronCompactRight } from "react-icons/tb"

interface Iprops {

    listSlides:string[]

}

const handleRadio =  (
    index:number, 
    setState:React.Dispatch<React.SetStateAction<number>>) =>
    (e:ChangeEvent<HTMLInputElement>) => {

    const int = parseInt(e.target.value) + 1
    index !== int && setState(int)
}


const Slider = ({listSlides}:Iprops) => {

    const [index, setIndex] = useState(1)
    const sliderRef = useRef<HTMLDivElement>(null)
    


    useEffect(() => {

        if(!sliderRef.current) return

        const element = sliderRef.current

        const width = element.scrollWidth / listSlides.length

        sliderRef.current.scrollTo({left:width * (index - 1), behavior:'smooth'})
        
    }, [index])

    useEffect(() => {

        
        const inter = setInterval(() => {

            if (index >= 1 && index  < listSlides.length) {

                setIndex((prev) => {

                    return prev += 1

                })
            

            } else {

                setIndex(1)

            }
          

        }, 5000)

        return () => clearInterval(inter)

    }, [index])

    const handlePrev = () => {

        index > 1 && setIndex(prev => prev -= 1)

    }

    const handleNext = () => {

        index < listSlides.length && setIndex(prev => prev += 1)

    }

    return (

        <div className="w-screen md:h-[70vh] h-[30vh] relative shadow-[0_0_0_1px] shadow-shadow">
            <div ref={sliderRef} className="overflow-x-hidden h-full w-full"
            >
            <div className="w-max h-full flex " >

                {listSlides.map((v, i) => (

                    <div key={i} className="w-screen h-auto flex
                    items-center justify-center 
                     relative">
                        <Image alt={`slide: ${v}`} src={v}
                        priority  fill sizes="100vw, auto"/>
                    </div>

                ))}

            </div>
            </div>

            <div className="absolute right-1/2 bottom-2.5
            translate-x-1/2 -translate-y-full
            flex gap-4">

            {listSlides?.map((_, i) => (
                <div key={i} 
                className={`w-4 h-4 rounded-full shadow-[0_0_0_1px]
                shadow-shadow hover:scale-140 transition-all duration-400
                [&>input[type='radio']]:cursor-pointer
                ${index === i+1 ? 'bg-fg-aph':'bg-bg'}`}>

                <input type="radio" name="slideIndex"
                value={i.toString()}
                onChange={handleRadio(index, setIndex)}
                className="w-full h-full opacity-0 z-2"/>

                </div>

            ))}

            </div>

            <button className="absolute right-5 top-1/2
            -translate-y-1/2 bg-bg-2 rounded-full p-2
            shadow-shadow shadow-sm cursor-pointer 
            hover:shadow-xl z-2" onClick={handleNext}>

                <TbChevronCompactRight size={24}/>

            </button>

            <button className="absolute left-5 top-1/2
            -translate-y-1/2 bg-bg-2 rounded-full p-2
            shadow-shadow shadow-sm cursor-pointer
            hover:shadow-xl z-2" onClick={handlePrev}>

                <TbChevronCompactLeft size={24}/>

            </button>

        </div>

    )

}

export default Slider