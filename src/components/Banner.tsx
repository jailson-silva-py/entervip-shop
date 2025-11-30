import Image from "next/image"
import { ComponentProps } from "react"

type BannerProps = {

    bannerUrl:string,
    alt:string,

} & ComponentProps<'div'>

export const Banner:React.FC<BannerProps> = ({bannerUrl, alt, ...props}) => {

    return (
    
    <div className="relative md:h-[60vh] h-[40vh]">
    <Image alt="banner-1" src={bannerUrl} priority fill quality={75} />
    </div>
    
    )

}

export default Banner