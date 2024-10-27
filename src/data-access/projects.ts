import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import {unstable_cache as cache} from "next/cache";

export const getProjects = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  console.log("yo");
  return cache(
    async () => {
      console.log("Fetching from Prisma (not cached)");
      return await prisma.board.findMany({
        where: {
          OR: [
            {
              userId: user.id,
            },
            {
              boardMembers: {
                some: {
                  userId: user.id,
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    },
    [`projects-${user.id}`],
    {
      tags: [`projects-${user.id}`],
    }
  )();
};
