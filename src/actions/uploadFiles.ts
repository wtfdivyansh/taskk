"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { ClientUploadedFileData } from "uploadthing/types";

export const uploadFiles = async({uploadResult,taskId}:{uploadResult:ClientUploadedFileData<{uploadedBy:string}>[],taskId:string}) => {
    console.log(uploadResult);
  const user = await currentUser();
  if(!user) throw new Error("User not found");
  const files = await prisma.attachment.createMany({
    data: uploadResult.map((file) => ({
      name: file.name,
      type: file.type,
      taskId,
      url: file.url,
    })),
    skipDuplicates: true,
  });
  if(!files) throw new Error("Files not found");
  console.log("files count",files.count);
  return files;
};