"use client";
import { findUserById, updateUserById } from "@/actions"
import { ToastContext } from "@/contexts/ToastContext";
import { User } from "@/types/utilityTypes";
import Image from "next/image"
import { ChangeEvent, FormEvent, Suspense, use, useEffect, useState, useTransition } from "react";
import { TbCamera, TbLoader, TbPlus } from "react-icons/tb"

interface ImageObjType {

    image:null|File|undefined,
    imageUrl:string|undefined|null

}
const initialImageObj:ImageObjType = {image:null, imageUrl:null}

const Profile = () => {

  const [user, setUser] = useState<User|null>(null)
  const [imageObj, setImageObj] = useState<ImageObjType>(initialImageObj)

  const [pending, startTransition] = useTransition()
  const [, setToastObj] = use(ToastContext)
  
  useEffect(() => {

    startTransition(async () => {

      const user = await findUserById()
      setUser(user)

    })

   }, [])

   useEffect(() => {

    if(!imageObj.image) return

    const reader = new FileReader()
    reader.onloadend = () => {

        setImageObj(prev => ({...prev, imageUrl:reader.result?.toString()}))

    }

    reader.readAsDataURL(imageObj.image)

   }, [imageObj])

   const submitForm = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {

      const toast = await updateUserById(formData)
      
      setToastObj(toast)

    })

   }

   const handleChangeFile = (e:ChangeEvent<HTMLInputElement>) => {

    setImageObj(prev => ({...prev, image:e.target.files?.[0]}))

   }

    return (
        <Suspense fallback={<p>Loading...</p>}>
        <form onSubmit={submitForm} encType="multipart/form-data"
        className="w-[min(700px,90%)] min-h-screen mx-auto py-20
        flex flex-col gap-6 tracking-widest">

        
        <div className="relative w-37.5 h-37.5 mb-10 mx-auto rounded-full shadow-default shadow-shadow">
        <input type="file" onChange={handleChangeFile}
        accept="image/*" name="imageFile" className="absolute
        w-full h-full z-1 cursor-pointer opacity-0"/>
        <Image src={imageObj.imageUrl ? imageObj.imageUrl: user?.image ?? "/not-profile-image.webp"} alt="Imagem de perfil" fill priority className="rounded-full"/>
        <div className="absolute right-0 bottom-0  p-1 rounded-full bg-bg-2 shadow-default shadow-shadow opacity-80">
          <TbCamera size={24} className="stroke-1"/>
        </div>
        </div>

        <label>
            <input type="text" name="username" className="border-b border-shadow
            outline-none transition-[padding] duration-300
            rounded-sm text-sm py-1 px-2 w-full h-8"
            defaultValue={user?.name || ""}/>
        </label>

        <label>
            <input type="email" name="email" className="border-b border-shadow
            outline-none transition-[padding] duration-300
            rounded-sm text-sm py-1 px-2 w-full h-8 opacity-40"
            defaultValue={user?.email || "Nenhum email atribuído"} disabled/>
        </label>

        <div>

          <div className="text-xl font-normal">Endereços:</div>
          
          {user?.addresses ?
          <ul>
          {user?.addresses.map((ad) => (

            <li className="font-normal text-sm flex flex-col gap-2">

            <h2 className="font-medium text-sm">
              {ad.line1}
            </h2>
            <span>
              {ad.postal}
            </span>
            <p className="font-medium text-sm">
              {ad.line2}
            </p>
            
            <span>{ad.city} — {ad.state} — {ad.country}</span>
            <span>{ad.label}</span>
            </li>

          ))}
          </ul> 
          : 
          <p>Não há nenhum endereço registrado.</p>
          }

        <button className="flex gap-1 h-10 py-1 bg-gold-aph font-medium">
         <TbPlus size={24} className="stroke-1"/>
         <span>Adicionar Endereço</span>
          
        </button>

        </div>

        <div className="ml-auto flex gap-2 w-50">

        <button type="reset" className={`bg-red-600 w-full max-w-75 py-2 px-4 rounded-sm
        font-medium cursor-pointer shadow-default shadow-shadow
        hover:brightness-95 flex items-center justify-center disabled:opacity-75`} >
            Descartar
        </button>
        <button type="submit" className={`bg-fg w-full max-w-75 py-2 px-4 rounded-sm
        font-medium cursor-pointer shadow-default shadow-shadow
        hover:brightness-95 flex items-center justify-center disabled:opacity-75`} >
            {pending ? <TbLoader size={24} className="stroke-1 animate-spin"/>:"Salvar"}
        </button>

        </div>

        </form>
        </Suspense>

    )

}

export default Profile