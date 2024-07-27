import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    // Check if the user is authenticated
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Validate input data
    if (typeof name !== 'string' || typeof image !== 'string') {
      return new NextResponse('Invalid input', { status: 400 });
    }

    // Update user information
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { image, name }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('ERROR_SETTINGS:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
