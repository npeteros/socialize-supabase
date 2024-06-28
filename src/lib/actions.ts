'use server';

import prisma from './prisma';
import { Account } from './types';
import { lucia } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { retrieveExistingEmailUser, validateRequest } from './data';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface AuthAccount extends Account {
    password?: string;
}

export async function createUser(data: AuthAccount) {
    if (data.password) data.password = bcrypt.hashSync(data.password);
    try {
        const user = await prisma.user.create({
            data
        })
        console.log("User created: ", user.id);
        return { status: 201, data: user.id };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { status: 500, data: 'Email already exists' }
            }
        }
    }
    return { status: 400, data: 'Unknown error' }
}

export async function signIn(data: AuthAccount) {
    console.log("AND HERE: ", data);

    const user = await retrieveExistingEmailUser(data.email);
    if (user && user.password) {
        const validate = bcrypt.compareSync(data.password as string, user.password)
        if (validate) {
            console.log("User signed in: ", user.id);
            await createUserSession(user.id)
            return { status: 201, data: user.id };
        }
    }
    return { status: 500, data: 'Invalid credentials' }
}

export async function signOut() {
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}

export async function createUserSession(userId: string) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}