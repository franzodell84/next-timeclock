'use server'

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'
import { z } from 'zod'


export async function createUserLog(prevState: any, formData: FormData){

    const schema = z.object({
        user: z.string().min(1),
        password: z.string().min(1),
        inout: z.string().min(1),
        notes: z.string().min(1),
      })

      const data = schema.parse({
        user: formData.get('user'),
        password: formData.get('password'),
        inout: formData.get('inout'),
        notes: formData.get('notes'),
      })

    var date = new Date();     
    let logTimestamp = Math.floor(date.getTime() / 1000);

    try{
        const result = await prisma.userLogs.create({
            data: {
                inout: data.inout,
                notes: data.notes,
                timestamp: logTimestamp,
                createdAt: date,
                updatedAt: date,
                userId: data.user
            }
         })

         revalidatePath('/')
         return { message: `Done creating a log record.` }
    }catch(e){
        return { message: 'Failed to create a log record.' }
    }


}