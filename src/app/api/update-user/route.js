import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { md5 } from "@/lib/utils";


export async function POST(request){
    const res = await request.json()

    try{
 
        let paramCount = Object.keys(res).length;

        //if(paramCount == 5){
            // create new
        //    const {userName , password, email, admin, disabled} = res;
        //}else{
            const {userId, userName , password, email, admin, disabled} = res;
        //}
        

        let encPassword = md5(password);

        var date = new Date();     

    
        if(userId == ""){
            
            // create record
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
        }else{
            // update existing user
            if(password == 'password_on_file' || password == ''){
                const result = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        name: userName,
                        email: email,
                        admin: admin,
                        disabled: disabled,
                        updatedAt: date
                    }
                })
            }else{
                const result = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        name: userName,
                        userPassword: encPassword,
                        email: email,
                        admin: admin,
                        disabled: disabled,
                        updatedAt: date
                    }
                })
            }

        }
        
        return NextResponse.json({result})

    } catch (error) {
        return NextResponse.json({error})
    }
}