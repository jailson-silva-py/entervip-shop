import slugify from "slugify"

export const makeSlug = (s:string) => {

    return slugify(s, {lower:true, strict:true, trim:true})

}