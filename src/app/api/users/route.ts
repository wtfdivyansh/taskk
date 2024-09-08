import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const User = await currentUser();
    if (!User) {
        return new Response("Unauthorized", {
            status: 401,
            statusText: "Unauthorized",
        });
    }
    const {data }= await req.json()
    console.log(data);
    const {boardId}=data
    console.log(boardId);
     const usersNotInBoard = await prisma.user.findMany({
       where: {
         NOT: {
           boardMember: {
             some: {
               boardId: boardId,
             },
           },
         },
       },
       select: {
         id: true,
         name: true,
         profileImage: true,
       },
     });

      if (usersNotInBoard.length === 0) {
        return NextResponse.json([]);
      }
   
   
     return NextResponse.json(usersNotInBoard)


}