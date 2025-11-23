import { findUserById } from "@/actions"
import Image from "next/image";
import { TbStar } from "react-icons/tb";

interface CommentProps {

    review:{
    title: string | null;
    body: string | null;
    createdAt: Date;
    rating: number;
    userId: string;
    } | null

}

const Comment = async ({review}:CommentProps) => {

    

    if(!review) return 
    const userComment = await findUserById(review.userId)

    return (

     <section className="flex flex-col w-full p-4 gap-2">
        <div className="w-max">
            <div className="flex gap-2 items-center">
            <Image src={userComment?.image || '/not-found.png'}
            className="rounded-full"
            alt={`user-${userComment?.name}`}width={32} height={32}/>
            <div className="flex gap-4 items-center">
                <span className="font-normal text-sm">
                    {userComment?.name}
                </span>
                <div className="flex gap-1 items-center">
                    <TbStar className="stroke-[.5] fill-fg-aph"/>
                    <span className="font-normal">{review.rating}</span>
                </div>
            </div>
            </div>

            <div className="text-xs text-center self-center">
            {review.createdAt.getDate()}/
            {review.createdAt.getMonth() + 1}/
            {review.createdAt.getFullYear()} {" "}
            {review.createdAt.getHours()}:
            {review.createdAt.getMinutes()}:
            {review.createdAt.getSeconds()}
            </div>
        </div>

        <div>
        <h1 className="font-normal text-sm">{review.title}</h1> 
        <p className="my-2">{review.body}</p>
        </div>

        <hr className="opacity-30"/>
    </section>
   
    )

}

export default Comment