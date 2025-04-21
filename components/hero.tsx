import Image from "next/image"
import { InteractiveHoverButton } from "./magicui/interactive-hover-button"
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
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
        {
          title: "Twitter",
          icon: (
            <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "https://x.com/AadishJ23",
        },
        {
          title: "Mail",
          icon: (
            <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "mailto:aadishjain017@gmail.com",
        },
      ];

    return(
        <div className="flex mt-20 mb-10 gap-5 lg:pl-[20vw] px-5 items-center" >
          <div className="relative w-32 h-40 sm:w-40 sm:h-48 lg:w-40 lg:h-48 rounded-lg overflow-hidden border-2 dark:border-4 border-gray-600 dark:border-gray-300 shadow-lg">
            <Image
              src="/Photo.jpeg"
              alt="Aadish Jain"
              fill
              className="object-cover"
            />
          </div>

            <div>
                <h1 className="dark:text-white text-3xl font-bold">Aadish Jain</h1>
                <p className="dark:text-white my-2">Software Engineer</p>
                <div className="w-full mb-2">
                    <FloatingDock
                        items={links}
                    />
                </div>
                <a href="https://drive.google.com/file/d/17eyJbui40twkZF0-JBlENlXqoza0R-9H/view?usp=drive_link" target="_blank"><InteractiveHoverButton> View Resume</InteractiveHoverButton></a>
            </div>
        </div>
    )
}