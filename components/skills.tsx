import { IconCloud } from "@/components/magicui/icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "react",
    "nextdotjs",
    "vite",
    "tailwindcss",
    "nodedotjs",
    "express",
    "postgresql",
    "prisma",
    "cloudinary",
    "amazonaws",
    "nginx",
    "docker",
    "git",
    "github",
    "visualstudiocode",
    "figma",
    "recoil",
    "cplusplus",
    "html5",
    "css3",
    "mysql",
    "mongodb",
  ];
  
  

export default function Skills(){

    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return(
        <div className="lg:pl-[20vw] px-5 mt-10">
            <p className="dark:text-white font-bold text-2xl">Skills</p>
            <div className="relative flex size-full items-center justify-center overflow-hidden">
                <IconCloud images={images} />
            </div>
        </div>
    )
}