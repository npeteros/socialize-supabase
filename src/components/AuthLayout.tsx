import { Sidebar } from "./MainComponents";
import { validateRequest } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await validateRequest();
    if (!user) return redirect("/login");    

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full justify-center pt-12">
                <section className="min-h-lvh w-2/5 rounded-2xl border border-neutral-700 bg-neutral-900 pt-2">
                    {children}
                </section>
            </main>
        </div>
    );
}
