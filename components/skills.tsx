"use client"

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const slugs = [
    { title: "C++", icon: "https://cdn.simpleicons.org/cplusplus" },
    { title: "HTML", icon: "https://cdn.simpleicons.org/html5" },
    { title: "CSS", icon: "https://cdn.simpleicons.org/css3" },
    { title: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
    { title: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { title: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
    { title: "ShadCN", icon: "https://cdn.simpleicons.org/shadcnui", invert: true },
    { title: "React.js", icon: "https://cdn.simpleicons.org/react" },
    { title: "Recoil", icon: "https://cdn.simpleicons.org/recoil" },
    { title: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs", invert: true },
    { title: "Vercel", icon: "https://cdn.simpleicons.org/vercel", invert: true },
    { title: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
    { title: "Express.js", icon: "https://cdn.simpleicons.org/express", invert: true },
    { title: "Postman", icon: "https://cdn.simpleicons.org/postman" },
    { title: "Git", icon: "https://cdn.simpleicons.org/git" },
    { title: "Github", icon: "https://cdn.simpleicons.org/github", invert: true },
    { title: "Docker", icon: "https://cdn.simpleicons.org/docker" },
    { title: "Prisma", icon: "https://cdn.simpleicons.org/prisma", invert: true },
    { title: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
    { title: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
    { title: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", invert: true  },
    { title: "Cloudinary", icon: "https://cdn.simpleicons.org/cloudinary" },
    { title: "Nginx", icon: "https://cdn.simpleicons.org/nginx" },
    { title: "Cloudflare", icon: "https://cdn.simpleicons.org/cloudflare" },
];

export default function Skills() {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); 
    }, []);

    return (
        <div className="lg:pl-[20vw] px-5 mt-10 w-full lg:w-4/5" data-aos="fade-down">
            <p className="dark:text-white font-bold text-2xl">Skills</p>
            <div className="flex flex-wrap gap-4 mt-5">
                {slugs.map(({ title, icon ,invert}) => (
                    <div
                        key={title}
                        className="flex border gap-2 items-center px-4 py-2 rounded-md border-gray-500 dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:border-red-500 hover:shadow-md dark:hover:bg-gray-700"
                    >
                        <img src={icon} alt={title} className={`w-8 h-8 ${invert ? "dark:invert" : ""}`} />
                        <span className="text-sm mt-1 dark:text-white group-hover:text-red-500">{title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
