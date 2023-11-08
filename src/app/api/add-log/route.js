import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(request){
    const res = await request.json()
    const {logUser , logPassword, logInOut, logNotes} = res;

    var date = new Date();     
    let logTimestamp = Math.floor(date.getTime() / 1000);

    console.log(logTimestamp);
    console.log(date);

     const result = await prisma.userLogs.create({
        data: {
            inout: logInOut,
            notes: logNotes,
            timestamp: logTimestamp,
            createdAt: date,
            updatedAt: date,
            userId: logUser
        }
     })

    return NextResponse.json({result})
}