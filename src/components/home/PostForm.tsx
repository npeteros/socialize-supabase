"use client";

import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { User } from "lucia";

export default function PostForm({user}: {user: User}) {
    const [post, setPost] = useState("");

    return (
        <>
            <div className="flex items-center gap-4">
                <UserAvatar user={user} />
                <div className="flex flex-col text-white">
                    <span>
                        {user?.displayName}
                    </span>
                    <input
                        type="text"
                        className="bg-transparent text-neutral-500 outline-none placeholder:text-neutral-500"
                        placeholder="Socialize..."
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
