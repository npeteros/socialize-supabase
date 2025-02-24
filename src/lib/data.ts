import prisma from "./prisma";
import { cache } from "react";
import { type Session, type User } from "lucia";
import { cookies } from 'next/headers';
import { lucia } from './auth';

export async function retrieveExistingGithubUser(githubId: number) {
    const data = await prisma.user.findUnique({
        where: {
            githubId
        }
    })
    return data;
}

export async function retrieveExistingEmailUser(email: string) {
    const data = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return data;
}

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }
        return result;
    }
);