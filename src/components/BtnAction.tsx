import { ComponentProps } from "react";
import { TbLoader } from "react-icons/tb";
import BtnWithLoading from "./BtnWithLoading";

type ColorsBg = 'grad-fg-fg-aph' | 'grad-gold-gold-aph'


type BtnActionProps = {

    text:string,
    variantBtn: ColorsBg

} & ComponentProps<'button'>

const getBg = (options:ColorsBg) => {

    switch(options) {

        case 'grad-fg-fg-aph':
            return 'bg-linear-210 from-fg to-fg-aph'
        case 'grad-gold-gold-aph':
            return 'bg-linear-210 from-gold to-fg-gold-aph'

    }

}

export const BtnAction:React.FC<BtnActionProps> = (
    {text, variantBtn, ...props}) => {

     const bg = getBg(variantBtn)
    

    return (
   
    <BtnWithLoading size={24} type="submit" className={`${bg} w-full max-w-75 py-2 px-4 rounded-sm
        font-medium cursor-pointer shadow-default shadow-shadow
        hover:brightness-95 flex items-center justify-center disabled:opacity-75`} {...props}>
        {text}
    </BtnWithLoading>
    
    )

}