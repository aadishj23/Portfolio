import Navbar from "@/components/navbar";
import AboutMe from "@/components/about";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Home() {
  return (
    <div className=" bg-[#F5F1EE] dark:bg-[#0f0f0f] min-h-screen">
      <ScrollProgress className="top-[71px]" />
      <Navbar />
      <Hero />
      <AboutMe />
      {/* <Skills /> */}
    </div>  
  );
}