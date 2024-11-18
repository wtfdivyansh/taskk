"use server"
import prisma from "@/lib/db"

export const getComments=async(taskId:string)=>{
    const task = await prisma.task.findUnique({
        where:{
            id:taskId
        }
    })
    if(!task){
        throw new Error("Task not found")
    }
    const comments = await prisma.comment.findMany({
        where:{
            taskId:taskId
        },
        orderBy:{
            createdAt:"desc"
        },
        select:{
            id:true,
            content:true,
            user : {
                select: {
                    id:true,
                    name:true,
                    username:true,
                    profileImage: true
                }
            }
        }
    })
    console.log("fetched comments",comments)
    return comments
}