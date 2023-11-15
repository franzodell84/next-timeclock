import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {

    interface User{
        id: string,
        username: string,
        email: string
    }

    interface Session {
        user: User & {
            id: string?,
            username: string,
            email: string,
        }
        token:{
            id: string,
            username: string,
            email: string,
        }
    }
}