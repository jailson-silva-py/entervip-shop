import LoginForm from "@/components/LoginForm"
import { auth } from "auth"
import { redirect } from "next/navigation"

const SignIn = async () => {

    const session = await auth()

    if(session) redirect('/')

    return (

        <LoginForm/>

    )

}


export default SignIn