import Banner from "@/components/Banner";
import ProductsCategory from "@/components/ProductsCategory";
import Slider from "@/components/Slider";

const listSlides = [

  '/slide-1.jpg', '/slide-2.jpg', '/slide-3.jpg',
  '/slide-4.jpg', '/slide-5.jpg'

]

interface Iprops {

  searchParams: Promise<{[key:string]:string | string[] | undefined}>

}

export default async function Home ({searchParams}:Iprops) {
  return (
    <div className="h-auto w-full flex flex-col gap-8">

        <Slider listSlides={listSlides}/>
        <ProductsCategory pageSize={10} title="Os mais populares"
        searchParams={searchParams} slug="popular"/>

        <Banner bannerUrl="/banner-page-1.png" alt="banner-1"/>
        <ProductsCategory pageSize={10} title="Itens da moda"
        searchParams={searchParams} slug="moda"/>

        <Banner bannerUrl="/banner-page-2.png" alt="banner-2"/>

        <ProductsCategory pageSize={10} title="Eletrônicos"
        searchParams={searchParams} slug="eletronicos"/>

        <Banner bannerUrl="/banner-page-3.png" alt="banner-3"/>

        <ProductsCategory pageSize={10} title="Tudo para realçar sua beleza!"
        searchParams={searchParams} slug="beleza"/>



    </div>
  );
}
