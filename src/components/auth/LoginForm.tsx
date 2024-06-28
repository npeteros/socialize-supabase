import Link from "next/link";
import { LoginEmail, LoginGithub } from "./Providers";

export default function LoginForm() {
    return (
        <div className="flex w-full flex-col gap-4">     
            <LoginEmail />
            <LoginGithub />
            {/* <LoginGoogle /> */}
            <Link href="/" className="text-center text-xs">
                Forgot password?
            </Link>
        </div>
    );
}
