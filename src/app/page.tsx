import AuthLayout from "@/components/AuthLayout";
import { NewPost } from "@/components/MainComponents";

export default async function Home() {
    
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
