import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { User } from "@prisma/client"; // Import the User type for type safety

const getUsers = async (): Promise<User[]> => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    console.error("Error fetching users:", error); // Log errors for debugging
    return [];
  }
};

export default getUsers;
