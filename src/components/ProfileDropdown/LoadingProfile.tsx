import { TbLoader } from "react-icons/tb"

export const Loading = () => {


    return (
    <div className="h-10 w-10 mx-2 rounded-full shadow-default
    shadow-shadow flex items-center justify-center
    animate-pulse bg-fg-aph cursor-progress"
    title="Carregando Informações do usuário">
    <TbLoader size={24} className="opacity-70
    animate-spin"/>
    </div>
    )

}