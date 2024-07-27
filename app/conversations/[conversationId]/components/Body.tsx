"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    const markAsSeen = async () => {
      try {
        await axios.post(`/api/conversations/${conversationId}/seen`);
      } catch (error) {
        console.error('Failed to mark conversation as seen:', error);
      }
    };

    markAsSeen();
  }, [conversationId]);

  useEffect(() => {
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
        .catch((error) => console.error('Failed to mark message as seen:', error));

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      // Debounce scrolling to avoid excessive re-renders
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((msg) =>
        msg.id === newMessage.id ? newMessage : msg
      ));
    };

    pusherClient.subscribe(conversationId);
    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
