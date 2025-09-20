import { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  portfolio: string[];
}

export default function Gallery({ portfolio }: GalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image
          src={portfolio[activeImage]}
          alt={`Portfolio image ${activeImage + 1}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {portfolio.map((image, index) => (
          <div
            key={index}
            className={`relative h-20 cursor-pointer rounded-md overflow-hidden border-2 ${
              index === activeImage ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setActiveImage(index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
