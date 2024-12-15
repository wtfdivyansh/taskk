"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getTags = async () => {
const user = await currentUser();
  if (!user) {
   throw new Error("User not found");
  }

  const tags = await prisma.tags.findMany({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
    },
  });
  return tags
}
