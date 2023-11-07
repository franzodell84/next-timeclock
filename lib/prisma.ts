import { PrismaClient } from '@prisma/client'


const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

/*
let prisma;

if (process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient()
}else{
    if(!global.prisma){
        global.prisma = new PrismaClient()
    }
}

export default prisma
*/