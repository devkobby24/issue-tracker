"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ImageComponent = () => {
  const images = ["/12.png", "/123.png", "/1234.png", "/12345.png"];
  const [randomImage, setRandomImage] = useState(images[0]); // Default to first image

  useEffect(() => {
    // Set a random image only on the client
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <div className="relative w-full h-80 rounded-md flex justify-center items-center">
      <div className="relative flex gap-4 flex-row">
        {/* Mobile: Display a single random image */}
        <Image
          src={randomImage}
          alt="Random Image"
          className="rounded-md object-cover w-full h-full sm:hidden"
          width={300}
          height={300}
          priority
        />

        {/* Tablet and larger: Display images based on screen size */}
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="rounded-md object-cover w-full h-full hidden sm:block overflow-hidden"
            width={300}
            height={300}
            priority={index === 0} // Prioritize the first image in the list
          />
        ))}
      </div>
    </div>
  );
};

export default ImageComponent;
