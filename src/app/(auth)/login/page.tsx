import { LoginView } from "@/components/auth/views/login-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/");
    }
    return <LoginView />;
};

export default Page;
