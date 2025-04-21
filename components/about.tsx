import { BoxReveal } from "@/components/magicui/box-reveal";

export default function AboutMe() {
    return (
      <div className="lg:pl-[20vw] px-5">
        <BoxReveal boxColor={"#70290A"} duration={0.5}>
        <p className="dark:text-white font-bold text-xl">About Me</p>
        </BoxReveal>
      </div>
    );
  }
  