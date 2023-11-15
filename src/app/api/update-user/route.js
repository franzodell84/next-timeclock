import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { md5 } from "@/lib/utils";


export async function POST(request){
    const res = await request.json()

    try{
 
        let paramCount = Object.keys(res).length;

        const {userId, userName , password, email, admin, disabled} = res;

        let hashPassword = md5(password);

        var date = new Date();     

    
        if(userId == ""){
            
            // check if email already exists
            const existingUserByEmail = await prisma.user.findUnique({
                where: { email: email}
            })

            if(existingUserByEmail){
                return NextResponse.json({ user: null, message: "User with this email already exists."} , { status: 409})
            }
   
            // check if username already exists
            const existingUserByUserName = await prisma.user.findUnique({
                where: { name: userName}
            })

            if(existingUserByUserName){
                return NextResponse.json({ user: null, message: "User with this username already exists."} , { status: 409})
            }
            
            // create record
            const result = await prisma.user.create({
                data: {
                    name: userName,
                    userPassword: hashPassword,
                    email: email,
                    admin: admin,
                    disabled: disabled,
                    createdAt: date,
                    updatedAt: date
                }
            })    

            return NextResponse.json({ user: result, message: "User created successfully."} , { status: 201})


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
                        userPassword: hashPassword,
                        email: email,
                        admin: admin,
                        disabled: disabled,
                        updatedAt: date
                    }
                })
            }

        }
        
        return NextResponse.json({ user: result, message: "User updated successfully."} , { status: 201})

    } catch (error) {
        //return NextResponse.json({ user: null, message: "Error."} , { status: 500})
        return NextResponse.json({error})
    }
}