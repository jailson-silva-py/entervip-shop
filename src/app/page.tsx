import ProductsCategory from "@/components/ProductsCategory";
import Slider from "@/components/Slider";

const listSlides = [

  '/slide-1.jpg', '/slide-2.jpg', '/slide-3.jpg',
  '/slide-4.jpg', '/slide-5.jpg'

]

export default function Home() {

  return (
    <div className="h-auto w-full flex flex-col gap-2">
        <Slider listSlides={listSlides}/>
        <ProductsCategory title="Os mais populares"/>
    </div>
  );
}
