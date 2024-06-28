import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { retrieveExistingGithubUser } from "@/lib/data";
import { createUser } from "@/lib/actions";
import { Account } from "@/lib/types";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const githubUser: GitHubUser = await githubUserResponse.json();
        console.log("GITHUB USER: ", githubUser);


        // Replace this with your own DB client.
        const existingUser = await retrieveExistingGithubUser(githubUser.id)

        if (existingUser) {
            console.log('hihihihihihi');
            
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        let email = githubUser.email ? githubUser.email : '';
        let imgUrl = `${githubUser.avatar_url}.jpg`

        // Replace this with your own DB client.
        const newData: Account = {
            username: githubUser.login,
            email: email,
            displayName: githubUser.name,
            githubId: githubUser.id,
            imgUrl,
        }

        const userId = await createUser(newData);

        if (userId.status == 201) {
            const session = await lucia.createSession(userId.data, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }                
        return new Response(null, {
            status: 500
        });
    }
}

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string,
    name: string,
    email: string | null
}