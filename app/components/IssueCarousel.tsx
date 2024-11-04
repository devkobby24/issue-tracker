import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: string;
  priority: string;
  tags: string[];
  createdDate: string;
}

const IssuesCarousel: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const images = ["/12.png", "/123.png", "/1234.png", "/12345.png"];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const animationDuration = scrollWidth / 70; // Adjust the speed of scrolling

      scrollRef.current.style.setProperty("--scroll-width", `${scrollWidth}px`);
      scrollRef.current.style.setProperty(
        "--animation-duration",
        `${animationDuration}s`
      );
    }
  }, [issues]);

  return (
    <div className="bg-white shadow-md rounded-sm p-6 w-full overflow-hidden">
      <h2 className="font-sans text-4xl font-bold mb-6 text-gray-600 text-center">
        Recent Issues By Users
      </h2>
      <div
        className="animate-scroll items-center justify-center md:mb-32 lg:mb-6"
        ref={scrollRef}
      >
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border p-4 rounded-lg shadow-sm flex-shrink-0 mr-4 space-y-2"
          >
            <h3 className="text-xl font-semibold mb-2 text-center">
              {issue.title.toUpperCase()}
            </h3>
            <p className="text-lg font-sans mb-2">
              <strong>🔠 Description:</strong> {issue.description}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>✅ Status:</strong> {issue.status}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>👨🏾‍💻 Assignee:</strong> {issue.assignee}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>🔼 Priority:</strong> {issue.priority}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>🏷️ Tag:</strong>{" "}
              {issue.tags.map((tag) => `#${tag}`).join(", ")}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>📅 Date Created:</strong> {issue.createdDate}
            </p>
          </div>
        ))}
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border p-4 rounded-lg shadow-sm flex-shrink-0 mr-4 space-y-2"
          >
            <h3 className="text-xl font-semibold mb-2 text-center">
              {issue.title.toUpperCase()}
            </h3>
            <p className="text-lg font-sans mb-2">
              <strong>🔠 Description:</strong> {issue.description}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>✅ Status:</strong> {issue.status}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>👨🏾‍💻 Assignee:</strong> {issue.assignee}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>🔼 Priority:</strong> {issue.priority}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>🏷️ Tag:</strong>{" "}
              {issue.tags.map((tag) => `#${tag}`).join(", ")}
            </p>
            <p className="text-lg font-sans mb-2">
              <strong>📅 Date Created:</strong> {issue.createdDate}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll var(--animation-duration) linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width) / 2));
          }
        }
      `}</style>

      {/* <div className="relative w-full h-80 rounded-md flex justify-center items-center">
        <div className="relative flex gap-4 flex-row">
          {["/12.png", "/123.png", "/1234.png", "/12345.png"].map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="rounded-md object-cover h-full w-full"
            width={300}
            height={300}
          />
          ))}
        </div>
      </div> */}

    <div className="relative w-full h-80 rounded-md flex justify-center items-center">
      <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Mobile: Show one random image */}
        <Image
          src={randomImage}
          alt="Random Image"
          className="rounded-md object-cover w-full h-full sm:hidden"
          width={300}
          height={300}
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
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default IssuesCarousel;
