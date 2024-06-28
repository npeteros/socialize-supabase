import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucia";
import UserAvatarSkeleton from "../skeletons/UserAvatarSkeleton";

export default function UserAvatar({
    user,
    src,
    className,
    onClick,
}: {
    user: User,
    src?: string;
    className?: string;
        onClick?: React.MouseEventHandler;
    }) {    
    
    
    return (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage src={src ? src : user?.imgUrl} className="object-cover" />
            <AvatarFallback><UserAvatarSkeleton /></AvatarFallback>
        </Avatar>
    );
}
