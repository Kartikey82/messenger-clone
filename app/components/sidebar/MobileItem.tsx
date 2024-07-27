"use client";

import Link from "next/link";
import clsx from "clsx";
import { IconType } from "react-icons"; // Assuming you're using react-icons for icon types

interface MobileItemProps {
  href: string;
  icon: IconType; // Use IconType for type safety
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute the onClick handler if provided
    }
  };

  return (
    <Link 
      onClick={handleClick}
      href={href}
      className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
      aria-current={active ? "page" : undefined} // Accessibility improvement
    >
      <Icon className="h-6 w-6" aria-hidden="true" /> {/* Hide icon from screen readers */}
    </Link>
  );
};

export default MobileItem;
