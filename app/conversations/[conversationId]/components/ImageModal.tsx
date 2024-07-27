"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src
}) => {
  if (!src) {
    return null; // If there's no image source, don't render the modal
  }

  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Image
          alt="Selected image"
          className="object-contain"
          layout="fill" // Use layout="fill" for responsive image scaling
          src={src}
        />
      </div>
    </Modal>
  );
}
 
export default ImageModal;
