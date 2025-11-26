import cloudinary from 'cloudinary'

const c = cloudinary.v2 


c.config({

    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME,

})

export default c






