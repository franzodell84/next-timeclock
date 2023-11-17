import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import prisma from './prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { md5 } from "@/lib/utils";

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
        error: '/error'
    },    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                /* username: { label: "Username", type: "text", placeholder: "jsmith"}, */
                password: { label: "Password", type: "password"},
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'dummy@mail.com'
                },
            },
            async authorize(credentials, _req) {
                try {
                    if(!credentials?.email || !credentials?.password){
                        return null;
                    }

                    const user = await prisma.user.findUnique({ where: { email: credentials?.email} })

                    if(!user){
                        return null;
                    }

                    if(md5(credentials.password) === user.userPassword){
                        // password match
                        const authUser = {                            
                            id: user.id,
                            username: user.name,
                            email: user.email
                        }

                        return authUser;
                    }

                    return null;

                } catch (error) {
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({token, user}){
            /**/

            if(user !== null){
                return {
                    ...token,
                    id: user.id,
                    username: user.name,
                    email: user.email
                }
            }else{
                throw new Error("Email / Password is incorrect.")
                //return { error: 'Invalid Email / Password.' };
            }
            
            //return token
        },
        async session({ session, user, token }) {
            try {
                if (!session.user?.email) {
                    throw new Error("Email / Password is incorrect.")
                }

                const currentUser = await prisma.user.findFirst({
                    where: {
                        email: session.user?.email
                    }
                })
                
                if (!currentUser) {
                    throw new Error("Email / Password is incorrect.")
                }

                return{
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id,
                        username: token.username,
                        email: token.email
                    }
                }
                /*
                if (!session.user?.email) {
                    throw new Error('User email undefined')
                }

                const currentUser = await prisma.user.findFirst({
                    where: {
                        email: session.user?.email
                    }
                })
                
                if (!currentUser) {
                    throw new Error('Current user undefined')
                }

                //session.user.id = currentUser.id;
                session.user.name = currentUser.name;
                session.user.email = currentUser.email;

                return session
                */
            } catch (error) {
                console.log(error)
                return session
            }
        },
        
    },
    
} satisfies NextAuthOptions

