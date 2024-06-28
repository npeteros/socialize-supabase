import { RegisterForm } from "@/components/MainComponents";
import { validateRequest } from "@/lib/data";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
});

export default async function Register() {
    const { user } = await validateRequest();
    if (user) return redirect("/");

    return (
        <div className="h-full min-h-lvh bg-white">
            <div className="flex h-screen flex-col items-center justify-center gap-6">
                <div className="flex w-full max-w-96 flex-col items-center border border-neutral-300 px-16 py-6">
                    <span
                        className={`mb-4 text-4xl font-bold ${dancingScript.className}`}
                    >
                        Socialize
                    </span>
                    <span className="mb-9 text-center font-bold text-neutral-700">
                        Register for free and explore the community of
                        Socialites!
                    </span>
                    <RegisterForm />
                </div>
                <div className="flex w-full max-w-96 items-center justify-center gap-1 border border-neutral-300 px-16 py-6 text-sm">
                    <span>Have an account?</span>
                    <Link href="/login" className="text-[#4CB4F8]">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
