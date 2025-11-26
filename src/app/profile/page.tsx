import cloudinary from "../../../cloudinary"
//test de hash
function toHex(u8:Uint8Array) {
  return [...u8].map(b => b.toString(16).padStart(2, "0")).join("");
}


const Profile = async () => {

    const crip = await crypto.subtle.digest('SHA-256', Buffer.from("Olá mundo 93219kkcdacacaococoaw"))
    
    const arrayBytes = new Uint8Array(crip)

    const hash:string = toHex(arrayBytes)
    
    console.log(arrayBytes)
    console.log(hash)


    return (

        <h1>Profile</h1>

    )

}

export default Profile