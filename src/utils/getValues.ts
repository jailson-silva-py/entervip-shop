import { getFullPricesCartItems } from "@/actions";
import { PromiseReturnType } from "@prisma/client/extension";

export const getFullPrice = (
cartItems:PromiseReturnType<typeof getFullPricesCartItems>) => {

    const valuesArray = cartItems.map(value => {

        if (value.variant.price) {

            return parseFloat(
            value.variant.price.amount.toString()) * value.qty

        }
        return 0
        
        })

    const total = valuesArray.reduce((prev, curr) => prev + curr);
    return total.toFixed(2)

}