import slugify from "slugify"

export const makeSlug = (s:string) => {

    return slugify(s, {lower:true, strict:true, trim:true})

}

export const firstLetterUpper = (s:string) => {

    return s[0].toLocaleUpperCase() + s.substring(1, s.length)
}