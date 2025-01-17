import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";

import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

import { FullMessageType } from "@/app/types"; // Import your message type

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  let conversation = null;
  let messages: FullMessageType[] = []; // Specify the type for messages

  try {
    conversation = await getConversationById(params.conversationId);
    messages = await getMessages(params.conversationId);
  } catch (error) {
    console.error("Error fetching conversation or messages:", error);
    // Handle error (e.g., show an error message)
  }

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
