import { BoxReveal } from "@/components/magicui/box-reveal";

export default function AboutMe() {
  return (
    <div className="lg:pl-[20vw] px-5">
      <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="dark:text-white font-bold text-2xl">About Me</p>
      </BoxReveal>

      <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="mt-6 mb-4 w-full lg:w-3/5 dark:text-gray-300">I'm a passionate Full Stack Developer skilled in React, Next.js, Express.js, and PostgreSQL. I've built full-fledged platforms like <span className="text-[#F00001] cursor-pointer font-semibold"><a href="https://github.com/aadishj23/Labeasy" target="_blank">Labeasy</a></span>, a secure lab diagnostics solution recognized as a Top 10 finalist at a Major League Hacking event, and <span className="text-[#F00001] cursor-pointer font-semibold"><a href="https://github.com/aadishj23/Quiz-App" target="_blank">Quizzical</a></span>, a dynamic quiz platform designed for smooth performance and real-time feedback.</p>
      </BoxReveal>

      <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="dark:text-gray-300 w-full lg:w-3/5">I also developed <span className="text-[#F00001] cursor-pointer font-semibold"><a href="https://github.com/aadishj23/Anveshan" target="_blank">Anveshan</a></span>, a full-stack app with a responsive UI, improving data visualization and interactivity.</p>
      </BoxReveal>

      <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="w-full lg:w-3/5 my-4 dark:text-gray-300">During my time at <span className="text-[#F00001] cursor-pointer font-semibold"><a href="https://drive.google.com/file/d/1-hMEYI8EIGmr3i5Gx3wEZe2eaDHGmeHx/view" target="_blank">Appzlogic</a></span>, I contributed to major product features and led a complete UI revamp that significantly improved user engagement. I also helped develop the official site for the <span className="text-[#F00001] cursor-pointer font-semibold"><a href="https://github.com/aadishj23/Namdapha" target="_blank">Namdapha Tiger Reserve</a></span>, enhancing the digital experience for visitors and wildlife enthusiasts alike.</p>
      </BoxReveal>

      <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="w-full lg:w-3/5 dark:text-gray-300">I've held leadership roles in my college tech society, mentored web development beginners, and enjoy working on projects that make an impact. Let's connect and build something great together.</p>
      </BoxReveal>
    </div>
  );
}
  