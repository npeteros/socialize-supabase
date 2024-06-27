"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatarSkeleton from "../skeletons/UserAvatarSkeleton";

export default function UserAvatar({
    src,
    className,
    onClick,
}: {
    src?: string;
    className?: string;
    onClick?: React.MouseEventHandler;
}) {
    return (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage
                src={
                    src ? src : "https://randomuser.me/api/portraits/men/32.jpg"
                    // (user?.photoURL as string)
                }
                className="object-cover"
            />
            <AvatarFallback>
                TestUser
                {/* {user?.displayName} */}
            </AvatarFallback>
        </Avatar>
    );

    // return !user ? (
    //     <UserAvatarSkeleton />
    // ) : (
    //     <Avatar className={className} onClick={onClick}>
    //         <AvatarImage src={src ? src : (user?.photoURL as string)} className="object-cover" />
    //         <AvatarFallback>{user?.displayName}</AvatarFallback>
    //     </Avatar>
    // );
}
