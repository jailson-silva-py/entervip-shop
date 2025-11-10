type InputTextType = React.ComponentProps<'input'>

const InputText:React.FC<InputTextType> = ({...props}:InputTextType) => {


    return (

        <input type="text" {...props}
        className="h-10 w-full shadow-[0_0_0_1px] px-4 py-4
        focus:shadow-[0_0_0_2px] rounded-sm outline-0
        shadow-shadow duration-300 transition-shadow animate-show"/>

    )

}

export default InputText