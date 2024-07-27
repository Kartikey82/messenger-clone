'use client';

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons"; // Assuming you are using react-icons

interface DesktopItemProps {
  label: string;
  icon: IconType; // Changed to IconType for better type safety
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute the callback if provided
    }
  };

  return ( 
    <li onClick={handleClick}>
      <Link 
        href={href}
        className={clsx(`
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          hover:bg-gray-100
        `,
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span> {/* For screen readers */}
      </Link>
    </li>
  );
}

export default DesktopItem;
