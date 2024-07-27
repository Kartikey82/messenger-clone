"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home = () => {
  // Get the conversation state
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block", // Always apply padding and height
        isOpen ? 'block' : 'hidden' // Toggle visibility based on `isOpen`
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
