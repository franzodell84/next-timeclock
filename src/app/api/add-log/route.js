import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { md5 } from "@/lib/utils";

export async function POST(request){
    const res = await request.json()
    const {logUser , logPassword, logInOut, logNotes} = res;

    // add password checking here
    const user = await prisma.user.findUnique({ where: { id: logUser} })



    if(md5(logPassword) !== user.userPassword){
        // password does not match
        return NextResponse.json({ user: logUser, message: "Password does not match."} , { status: 401})
    }

    var date = new Date();     
    let logTimestamp = Math.floor(date.getTime() / 1000);

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

     return NextResponse.json({ userlog: result, message: "Log was successfully created."} , { status: 201})
}