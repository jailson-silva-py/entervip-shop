"use client";
import { User } from "@/types/utilityTypes";

interface Iprops {

    user:User

}

const InputsClient = ({user}:Iprops) => {
    console.log(user?.name)
    return (
    <div className="flex flex-col gap-8">

        

    </div>
    )

}

export default InputsClient