import { ImageCarousel } from "@/components/imageCarousel";
import { Navbar } from "@/components/Navbar";

export default function Anime() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
          <Navbar />
          <ImageCarousel />
      </div>
    );
  }
  
  