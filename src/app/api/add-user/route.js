import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { md5 } from "@/lib/utils";

export async function POST(request){
    const res = await request.json()
    const {userName , password, email, admin, disabled} = res;

    let encPassword = md5(password);

    var date = new Date();     

     const result = await prisma.user.create({
        data: {
            name: userName,
            userPassword: encPassword,
            email: email,
            admin: admin,
            disabled: disabled,
            createdAt: date,
            updatedAt: date
        }
     })


    return NextResponse.json({result})
}