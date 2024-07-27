"use client";

import useActiveChannel from "../hooks/useActiveChannel";

const ActiveStatus = () => {
  // This hook might be subscribing to a real-time channel or updating some global state
  useActiveChannel();

  // This component does not render anything but ensures the hook is called
  return null;
};

export default ActiveStatus;
