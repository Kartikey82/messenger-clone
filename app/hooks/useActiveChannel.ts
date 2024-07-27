import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { useEffect } from "react";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();

  useEffect(() => {
    // Subscribe to the channel
    const channel = pusherClient.subscribe('presence-messenger');

    // Bind to events
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    // Cleanup on unmount or when channel changes
    return () => {
      pusherClient.unsubscribe('presence-messenger');
    };
  }, [set, add, remove]);
};

export default useActiveChannel;
