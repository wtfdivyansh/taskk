import prisma from "@/lib/db";
import { getRandomColor } from "@/lib/helper";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const tags = await prisma.tags.findMany({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
    },
  });
  console.log(tags);

  return NextResponse.json(tags);

}

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  const color = getRandomColor();
  const data = await req.json();
  const {name}=data
    const tags =await prisma.tags.create({
    data: {
      name: data.name,
      userId: user.id,
      color:color
    },
  });
  return NextResponse.json(tags)
}