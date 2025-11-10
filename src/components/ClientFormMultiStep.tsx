"use client"
import { TbArrowRight } from "react-icons/tb"
import InputText from "./InputText"
import { ChangeEvent, FormEvent, useState } from "react"

interface TypeData {

    email:string | null,
    password:string | null,
    code: string | null

}

const textArray = [
    "Digite seu email...",
    "Digite sua senha...",
    "Insira o código (e-mail)..."]


const initialState = {email:null, password:null, code:null} as TypeData;

const arraykeys = Object.getOwnPropertyNames(initialState) as Array<keyof typeof initialState>

const ClientFormMultiStep = () => {

    const [step, setStep] = useState(0)
    const [data, setData] = useState(initialState)

   
    const handleSubmit = (e:FormEvent) => {

        e.preventDefault();
        textArray.length-1 > step && setStep(prev => ++prev)

    }

    const handleSetDataStep = (e:ChangeEvent<HTMLInputElement>) => {

        setData(prev => ({...prev, [arraykeys[step]]:e.target.value}))
        
    }

    console.log(data)

    return (
    <form className="mx-auto px-4 w-9/10 flex flex-col
        gap-3 items-center" onSubmit={handleSubmit}>

            <label className="w-full flex flex-col gap-1 h-max">    
            <InputText placeholder={textArray[step]} 
            key={textArray[step]} onChange={handleSetDataStep} 
            value={data[arraykeys[step]] || ''} required/>
            </label>

            <button type="submit" className="bg-fg flex p-2 gap-1
            items-center cursor-pointer self-end rounded-sm shadow-[0_0_0_2px]
            shadow-shadow hover:bg-fg-hover group">
                <span className="text-xs">Avançar</span>
                <TbArrowRight className="stroke-1 group-hover:translate-x-0.5
                duration-300 transition-transform"/>
            </button>
            
    </form>
    )
}

export default ClientFormMultiStep