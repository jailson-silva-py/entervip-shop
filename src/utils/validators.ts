
export const onlyNumbers = (value:string) =>  {
    return value.match(/[0-9]/g)?.join('')
}

