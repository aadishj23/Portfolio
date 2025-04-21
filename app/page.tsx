import Navbar from "@/components/navbar";
import AboutMe from "@/components/about";
import Hero from "@/components/hero";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Home() {
  return (
    <div className=" bg-[#F5F1EE] dark:bg-black min-h-screen">
      <ScrollProgress className="top-[71px]" />
      <Navbar />
      <hr className="h-px mt-2 bg-black dark:bg-[#7a7a7aa3] border-0" />
      <Hero />
      <AboutMe />
    </div>  
  );
}