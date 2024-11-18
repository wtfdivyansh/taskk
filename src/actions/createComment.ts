"use server"
import prisma from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const createComment = async(taskId:string,content:string)=>{
    const user = await currentUser()
    if(!user){
        throw new Error("Not logged in")
    }
    if(!taskId){
        throw new Error("Task id is required")
    }
    const task = await prisma.task.findUnique({
        where:{
            id:taskId
        }
    })
    if(!task){
        throw new Error("Task not found")
    }
    console.log("i am here")
    const comment = await prisma.comment.create({
        data:{
            content:content,
            taskId:taskId,
            userId:user.id
        }
    })
    if(!comment){
        throw new Error("Comment not created")
    }

    console.log("created comment", comment.content)
    return comment
}

