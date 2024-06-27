import AuthLayout from "@/components/AuthLayout";
import { NewPost } from "@/components/MainComponents";

export default function Home() {
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
