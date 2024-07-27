"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type = "text", // Default type to 'text'
  required,
  register,
  errors
}) => {
  // Extract the error message, if present
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        aria-required={required}
        className={clsx(
          "text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none",
          {
            "border border-red-500": errorMessage // Conditional class for error state
          }
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p> // Display the error message
      )}
    </div>
  );
};

export default MessageInput;
