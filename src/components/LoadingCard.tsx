import { TbLoader } from "react-icons/tb";

const LoadingCard = () => {

return (
<div className="h-64 w-37 flex items-center
justify-center shadow-default shadow-shadow bg-bg-2 opacity-80">

<TbLoader size={32} className="text-text animate-spin"/>

</div>)

}

export default LoadingCard