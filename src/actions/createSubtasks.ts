"use server"
import prisma from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const createSubtasks = async(taskId:string,title:string)=>{
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
    const subtasks = await prisma.subtask.create({
        data:{
            title:title,
            taskId:taskId,
        }
    })
    if(!subtasks){
        throw new Error("Subtask not created")
    }

    console.log("created subtask", subtasks)
    return subtasks

}


export const toggleSubtask = async(subtaskId:string,isCompleted:boolean)=>{
    const user = await currentUser()
    if(!user){
        throw new Error("Not logged in")
    }
    if(!subtaskId){
        throw new Error("Subtask id is required")
    }
    const subtask = await prisma.subtask.update({
        where:{
            id:subtaskId
        },
        data:{
            isCompleted:!isCompleted
        }
    })
    if(!subtask){
        throw new Error("Subtask not updated")
    }
    console.log("updated subtask", subtask)
    return subtask
}