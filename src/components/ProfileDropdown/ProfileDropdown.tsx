import {  ProfileDropdownClient } from "./ProfileDropdownClient"
import { findUserById } from "@/actions"

export const ProfileDropdown = async () => {
   
    const user = await findUserById()
    return (
   
    <ProfileDropdownClient user={user}/>
 
    )
}

export default ProfileDropdown