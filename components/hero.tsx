import Image from "next/image"
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  // IconBrandX,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export default function Hero(){

  const links = [
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/aadishj23",
    },
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/aadishj23/",
    },
    // {
    //   title: "Twitter",
    //   icon: (
    //     <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "https://x.com/AadishJ23",
    // },
    {
      title: "Mail",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:aadishjain017@gmail.com",
    },
  ];

  return(
    <div className="flex pt-24 mb-10 gap-5 lg:pl-[20vw] px-5 items-center" >
      <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2  border-gray-600 dark:border-gray-300 shadow-lg">
        <Image
          src="/pic2.jpeg"
          alt="Aadish Jain"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          <h1 className="dark:text-white text-3xl font-bold">Aadish Jain</h1>
          <div
            className="hidden md:flex items-center space-x-1 px-3 py-1 rounded-xl mt-2 w-max "
          >
            <span className="h-2 w-2 rounded-full bg-[#F00001] animate-pulse"></span>
            <span className="dark:text-white text-sm font-medium ml-1">Available to work</span>
          </div>
        </div>
        <p className="dark:text-white my-2">Software Engineer</p>
        <div className="w-full mb-2">
          <FloatingDock
            items={links}
          />
        </div>
      </div>
    </div>
  )
}