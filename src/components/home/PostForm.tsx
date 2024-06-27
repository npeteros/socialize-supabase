"use client";

import { useState } from "react";
import UserAvatar from "./UserAvatar";

export default function PostForm() {
    const [post, setPost] = useState("");

    return (
        <>
            <div className="flex items-center gap-4">
                <UserAvatar />
                <div className="flex flex-col text-white">
                    <span>
                        TestUser
                        {/* {user?.displayName} */}
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
