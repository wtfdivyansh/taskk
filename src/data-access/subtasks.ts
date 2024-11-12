"use server"
import prisma from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const getSubtasks=async(taskId:string)=>{
    const user = await currentUser()
    if(!user){
        throw new Error("Not logged in")
    }
    console.log("i am  here")
    const task = await prisma.task.findUnique({
        where:{
            id:taskId
        }
    })
    if(!task){
        throw new Error("Task not found")
    }
    const subtasks = await prisma.subtask.findMany({
        where:{
            taskId:taskId
        },
        orderBy:{
            createdAt:"desc"
        },
        select:{
            id:true,
            title:true,
            isCompleted:true,
            taskId:true
        }
    })
    console.log("fetched subtasks")
    return subtasks
}