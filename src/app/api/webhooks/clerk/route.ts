import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("✅ Received webhook from Clerk");
    const body = await req.json();
    const { id, email_addresses, first_name, image_url, username } = body?.data;
    console.log("after", body);

    const email = email_addresses[0]?.email_address;
    console.log("✅", body);

 
    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (existingUser) {

      await prisma.user.update({
        where: { id: id },
        data: {
          email,
          name: first_name,
          profileImage: image_url || "",
          username,
        },
      });
    } else {
     
      await prisma.user.create({
        data: {
          id: id,
          email,
          name: first_name || "",
          profileImage: image_url || "",
          username,
        },
      });

      
     
    }

    return new NextResponse("User updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
