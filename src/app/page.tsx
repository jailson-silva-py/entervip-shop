import ProductsCategory from "@/components/ProductsCategory";
import Slider from "@/components/Slider";
import { ProductForCard } from "@/types/utilityTypes";


const listSlides = [

  '/slide-1.jpg', '/slide-2.jpg', '/slide-3.jpg',
  '/slide-4.jpg', '/slide-5.jpg'

]

interface Iprops {

  searchParams: Promise<{[key:string]:string | string[] | undefined}>

}

export default async function Home ({searchParams}:Iprops) {

  return (
    <div className="h-auto w-full flex flex-col gap-2">
        <Slider listSlides={listSlides}/>
        <ProductsCategory title="Os mais populares"
        searchParams={searchParams} slug="popular"/>
    </div>
  );
}
