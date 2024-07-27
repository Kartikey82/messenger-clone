import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;

    // Ensure the conversationId is provided
    if (!conversationId) {
      return new NextResponse('Conversation ID is required', { status: 400 });
    }

    // Get the current user
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    // Delete the conversation
    await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          has: currentUser.id,
        },
      },
    });

    // Notify users
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json({ message: 'Conversation deleted successfully' });
  } catch (error: any) {
    console.error('ERROR_CONVERSATION_DELETE:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
